import { Router } from "express";
import { createUsers, getUsers } from "../controllers/user.controller"
import { createGroups, getGroups } from "../controllers/group.controller";

const router = Router();

router.get('/users', getUsers);
router.post('/user/create', createUsers);


router.get('/groups', getGroups);
router.post('/groups/create', createGroups);

export default router;
