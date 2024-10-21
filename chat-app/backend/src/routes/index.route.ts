import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { ChatController } from "../controllers/chat.controller";
import { MessageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()
const userController = new UserController();
const chatController = new ChatController();
const messageController = new MessageController();

// User routes
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);


//Chat routes
router.post('/rooms', authMiddleware, chatController.create);
router.get('/rooms', chatController.getAllRooms);
router.get('/rooms/:id', chatController.getRoomById);

//Message routes
router.post('/messages', authMiddleware, messageController.create);
router.get('/rooms/:chatRoomId/messages', messageController.getRoomMessages);

export default router;