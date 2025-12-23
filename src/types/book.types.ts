import {z} from 'zod';

export const BookSchema = z.object({
    id: z.string().min(1, "Book ID is required"),
    title: z.string().min(1, "Book title is required"),
    date: z.string().optional(),
})

export type Book = z.infer<typeof BookSchema>;  // automatically crate type from schema
// schema, more than type checking - runtime validation
// what defines the shape of data, what validates data -> book