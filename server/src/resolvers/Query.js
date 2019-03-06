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
    },
    reviews(parent, args, {
        prisma
    }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                },{
                    body_contains: args.query
                }, {
                    experience_contains: args.query
                }]
            }
        }

        return prisma.query.reviews(opArgs, info)
    },
    comments(parent, args, {
        prisma
    }, info) {
        const opArgs = {}

        return prisma.query.comments(opArgs, info)
    },
    businesses(parent, args, {
        prisma
    }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }, {
                    contactNumber_contains: args.query
                }]
            }
        }

        return prisma.query.businesses(opArgs, info)
    },
    events(parent, args, {
        prisma
    }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    description_contains: args.query
                }, {
                    category_contains: args.query
                }]
            }
        }

        return prisma.query.events(opArgs, info)
    }
}

export {
    Query as
    default
}