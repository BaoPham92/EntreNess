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
    async createBusiness(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createBusiness({
            data: {
                name: args.data.name,
                email: args.data.email,
                contactNumber: args.data.contactNumber,
                description: args.data.description,
                owner: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async updateBusiness(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const businessExist = await prisma.exists.Business({
            id: args.id,
            owner: {
                id: userId
            }
        })

        if (!businessExist) {
            throw new Error('Cannot find business!')
        }

        return prisma.mutation.updateBusiness({
            where: {
                id: args.id
            },
            data: {
                name: args.data.name,
                email: args.data.email,
                contactNumber: args.data.contactNumber,
                description: args.data.description,
                employees: {
                    connect: {
                        id: args.data.employees
                    }
                }
            }
        }, info)
    },
    async deleteBusiness(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const businessExist = await prisma.exists.Business({
            id: args.id,
            owner: {
                id: userId
            }
        })

        if (!businessExist) {
            throw new Error('Cannot delete business!')
        }

        return prisma.mutation.deleteBusiness({
            where: {
                id: args.id
            }
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
    },
    async createComment(parent, args, {
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const reviewExist = await prisma.exists.Review({
            id: args.data.review,
            published: true
        })

        if (!reviewExist) {
            throw new Error('Unable to post comment!')
        }

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
                    }
                },
                review: {
                    connect: {
                        id: args.data.review
                    }
                }
            }
        }, info)
    },
    async updateComment(parent, args, { 
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const commentExist = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExist) {
            throw new Error('Cannot update comment!')
        }

        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async deleteComment(parent, args, { 
        prisma,
        request
    }, info) {
        const userId = getUserId(request)
        const commentExist = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if (!commentExist) {
            throw new Error('Unable to delete comment!')
        }

        return prisma.mutation.deleteComment({
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