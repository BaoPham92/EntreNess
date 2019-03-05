import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, {
        prisma
    }, info) {
        const password = await hashPassword(args.data.password)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async login(parent, args, {
        prisma
    }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async deleteUser(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },
    async createReview(parent, args, { 
        prisma,
        request
     }, info) {
        const userId = await getUserId(request)

        return prisma.mutation.createReview({
            data: {
                title: args.data.title,
                body: args.data.body,
                experience: args.data.experience,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async updateReview(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const reviewExist = await prisma.exists.Review({
            id: args.id,
            author: {
                id: userId
            }
        })
        const isPublished = await prisma.exists.Review({
            id: args.id, published: true
        })

        if (!reviewExist) {
            throw new Error('Cannot find post!')
        }

        // Create if statement when creating (Comment) custom type here.
        // If published is true && input args.data.published === false | then delete comments.

        return prisma.mutation.updateReview({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async deleteReview(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const reviewExist = await prisma.exists.Review({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!reviewExist) {
            throw new Error('Cannot delete review!')
        }

        return prisma.mutation.deleteReview({
            where: {
                id: args.id
            }
        }, info)
    }
}

export {
    Mutation as
    default
}