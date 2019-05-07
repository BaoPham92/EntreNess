import getUserId from '../utils/getUserId'

const Post = {
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
                    post: {
                        id: parent.id
                    }
                }
            }, info)
        }
    }
}

export {
    Post as
    default
}