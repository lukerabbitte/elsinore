"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
    title: z
        .string()
        .min(3, {
            message: "Title must be at least 3 characters.",
        })
        .max(50, {
            message: "Title must be at most 50 characters.",
        }),
    content: z
        .string()
        .min(5, {
            message: "Content must be at least 5 characters.",
        })
        .max(500, {
            message: "Content must be at most 500 characters.",
        }),
    fullTextUrl: z.string().url({
        message: "Must be a valid URL.",
    }),
    wikipediaUrl: z
        .string()
        .url({
            message: "Must be a valid URL.",
        })
        .optional(),
    voiceId: z.string().nonempty({
        message: "Voice ID is required.",
    }),
});

const HighlightForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            fullTextUrl: "",
            wikipediaUrl: "",
            voiceId: "",
        },
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormDescription>Enter the title of the highlight.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Content" {...field} />
                            </FormControl>
                            <FormDescription>Enter the content of the highlight.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullTextUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Text URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Text URL" {...field} />
                            </FormControl>
                            <FormDescription>Enter the URL to the full text.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="wikipediaUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Wikipedia URL</FormLabel>
                            <FormControl>
                                <Input placeholder="Wikipedia URL" {...field} />
                            </FormControl>
                            <FormDescription>Enter the Wikipedia URL (optional).</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voiceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ElevenLabs Voice</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="voice1">
                                            Voice 1 - Description
                                        </SelectItem>
                                        <SelectItem value="voice2">
                                            Voice 2 - Description
                                        </SelectItem>
                                        <SelectItem value="voice3">
                                            Voice 3 - Description
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                Select a voice for generating the audio.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default HighlightForm;
