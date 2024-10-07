import { Kafka } from "kafkajs";
import { SocketService } from "./socket.service";

const kafka = new Kafka({
      clientId: 'chat-app',
      brokers: ['localhost: 9092']

})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'chat-group' })
export const runProducer = async () => {
      await producer.connect()
      console.log("Producer has been connected")
}

export const produceMessage = async (topic: string, message: string) => {
      await producer.send({
            topic,
            messages: [{ key: `message-Date.now()`, value: message }]
      })
      console.log(`Message produced to kafka:${message}`)
}


export const consumeMessage = async (socketService: SocketService) => {
      await consumer.connect()
      await consumer.subscribe({ topic: 'test-topic', fromBeginning: false })
      await consumer.run({
            eachMessage: async ({ message }) => {
                  const parsedMessage = message.value?.toString();
                  console.log("Message consumeed", message)
                  socketService.emitMessage('test-topic', parsedMessage || '')
            }
      })
}