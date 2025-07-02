import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";

export class ECSService {
  private client: ECSClient;

  constructor() {
    this.client = new ECSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async runTranscoderTask(bucketName: string, key: string) {
    const command = new RunTaskCommand({
      taskDefinition: process.env.ECS_TASK_DEFINITION!,
      cluster: process.env.ECS_CLUSTER!,
      launchType: "FARGATE",
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: "ENABLED",
          securityGroups: process.env.SECURITY_GROUPS!.split(","),
          subnets: process.env.SUBNETS!.split(","),
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: process.env.CONTAINER_NAME!,
            environment: [
              { name: "BUCKET_NAME", value: bucketName },
              { name: "KEY", value: key },
            ],
          },
        ],
      },
    });

    await this.client.send(command);
  }
}
