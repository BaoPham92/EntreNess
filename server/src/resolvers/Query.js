import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, {
        prisma
    }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    self(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        })
    }
}

export {
    Query as
    default
}