import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
    {
        user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
		},
        img: {
			type: String,
		},
        comments: [
			{
				text: {
					type: String,
					required: true,
				},
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
			},
		],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: () => [],
            },
        ],
        retweets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: () => [],
            },
        ],
        hashtags: [
            {
                type: String,
                default: () => [],
            },
        ],
        
    },
    { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
