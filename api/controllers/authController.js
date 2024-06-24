

export const signup = async (req, res, next) =>{
    res.json({
        data: "the signup endpoint",
    });
};

export const signin = async (req, res, next) =>{
    res.json({
        data: "the signin endpoint",
    });
};

export const signout = (req, res) => {
    res.json({
        data: "the signout endpoint",
    });
};