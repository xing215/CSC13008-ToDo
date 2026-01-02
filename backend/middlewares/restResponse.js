export default function restResponse (req, res, next) {
    res.ok = (data) => {
        res.status(200).json(data);
    };

    res.created = (data) => {
        res.status(201).json(data);
    };

    res.noContent = () => {
        res.sendStatus(204);
    };

    res.badRequest = (data = null) => {
        if (data)
            res.status(400).json(data);
        else
            res.status(400).json({ message: 'Bad request' });
    }

    res.unauthorized = (data = null) => {
        if (data)
            res.status(401).json(data);
        else
            res.status(401).json({ message: 'Unauthorized' });
    };

    res.forbidden = (data = null) => {
        if (data)
            res.status(403).json(data);
        else
            res.status(403).json({ message: "You don\'t have permission to access this resource" });
    };

    res.notFound = (data = null) => {
        if (data)
            res.status(404).json(data);
        else
            res.status(404).json({ message: 'Not found' });
    };

    res.conflict = (data) => {
        res.status(409).json(data);
    }

    next();
}