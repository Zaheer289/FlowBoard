import User from '../models/User.js';

export const findUserByName = async (req, res) => {
    try {
        // Use regex for a case-insensitive exact match
        const nameRegex = new RegExp(`^${req.params.name}$`, 'i');
        const user = await User.findOne({ name: nameRegex }).select('_id name');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
