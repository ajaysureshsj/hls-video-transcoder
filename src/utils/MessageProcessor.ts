import { S3Event } from "aws-lambda";

export class MessageProcessor {
  parse(body: string): S3Event | null {
    try {
      return JSON.parse(body) as S3Event;
    } catch (error) {
      return null;
    }
  }

  isTestEvent(event: S3Event): boolean {
    return (
      "Service" in event && "Event" in event && event.Event === "s3:TestEvent"
    );
  }
}
