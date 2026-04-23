import { userList } from "../models/userModel.js";

export function handleUsers(req, res) {
    const users = userList();
    res.render('users', { users });
}