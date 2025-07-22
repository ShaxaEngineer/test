import amqp from 'amqplib';

export const consumeFromQueue = async (queueName: string) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, (message) => {
    if (message) {
      const data = JSON.parse(message.content.toString());
      console.log(`📩 Received message from ${queueName}:`, data);

      // ✅ You can do something with the data here
      channel.ack(message); // mark message as done
    }
  });

  console.log(`👂 Waiting for messages in ${queueName}...`);
};
