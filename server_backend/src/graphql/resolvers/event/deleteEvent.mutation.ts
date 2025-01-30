import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import prisma from "../../../config/db";
import { MyContext } from "../../../types/context";

@Resolver()
export class DeleteEventResolver {

    @Mutation(() => String)
    async deleteEvent(
        @Arg("id") id: string,
        @Ctx() ctx: MyContext
    ) { 
        if (!ctx.userId) {
            throw new Error("Not authenticated");
        }
        if (await prisma.event.delete({ where: { id: id } })) { 
            return "Event deleted"
        }
        throw new Error("Unable to delete event")
    }
}