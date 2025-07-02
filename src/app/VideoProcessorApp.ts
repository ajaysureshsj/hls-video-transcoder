import { SQSService } from "../services/SQSService.js";
import { ECSService } from "../services/ECSService.js";
import { MessageProcessor } from "../utils/MessageProcessor.js";

export class VideoProcessorApp {
  private sqs: SQSService;
  private ecs: ECSService;
  private processor: MessageProcessor;

  constructor() {
    this.sqs = new SQSService(process.env.SQS_QUEUE_URL!);
    this.ecs = new ECSService();
    this.processor = new MessageProcessor();
  }

  async run() {
    while (true) {
      const messages = await this.sqs.receiveMessage();
      if (!messages) {
        console.log("No messages in Queue");
        continue;
      }

      for (const message of messages) {
        const { Body, ReceiptHandle, MessageId } = message;
        if (!Body || !ReceiptHandle) continue;

        console.log("Message received: ", { MessageId });

        const event = this.processor.parse(Body);
        if (!event) continue;

        if (this.processor.isTestEvent(event)) {
          await this.sqs.deleteMessage(ReceiptHandle);
          continue;
        }

        for (const record of event.Records) {
          const bucketName = record.s3.bucket.name;
          const key = record.s3.object.key;

          await this.ecs.runTranscoderTask(bucketName, key);
          await this.sqs.deleteMessage(ReceiptHandle);
        }
      }
    }
  }
}
