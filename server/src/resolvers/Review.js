import getUserId from '../utils/getUserId'

const Review = {
    commentsConnection: {
        async resolve(parent, args, {
            prisma
        }, info) {
            
            const opArgs = {
                first: args.first,
                skip: args.skip,
                after: args.after
            }

            return await prisma.query.commentsConnection({
                where: {
                    review: {
                        id: parent.id
                    }
                }
            }, info)
        }
    }
}

export {
    Review as
    default
}