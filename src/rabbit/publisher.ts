import amqp from 'amqplib';

export const publishToQueue = async (queueName: string, data: any) => {
   const connection = await amqp.connect('amqp://localhost');
   const channel = await connection.createChannel();

   await channel.assertQueue(queueName, { durable: true });

   const buffer = Buffer.from(JSON.stringify(data));
   channel.sendToQueue(queueName, buffer);

   console.log(`📤 Sent message to ${queueName}:`, data);

   const timer = setTimeout(() => {
      connection.close();
      clearTimeout(timer)
   }, 500);
};
