"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import UserAvatar from "@/components/UserAvatar";

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

    /* Watch content lengths for character counts */
    const titleValue = form.watch("title");
    const contentValue = form.watch("content");

    const [hasInteracted, setHasInteracted] = useState({
        title: false,
        content: false,
    });

    const handleInteraction = (field) => {
        setHasInteracted((prev) => ({ ...prev, [field]: true }));
    };

    const getCounterClass = (value, min, max, interacted) => {
        if (!interacted) return "text-highlight";
        return value.length < min || value.length > max ? "text-destructive" : "text-highlight";
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gradient-radial p-4 w-full max-w-prose rounded-xl"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="flex flex-row items-center justify-between">
                                Title
                                <span
                                    className={`ml-2 text-sm ${getCounterClass(
                                        titleValue,
                                        3,
                                        50,
                                        hasInteracted.title
                                    )}`}
                                >
                                    {titleValue.length} / 50
                                </span>
                            </FormLabel>
                            <FormControl>
                                <input
                                    className="w-full text-2xl text-foreground placeholder:text-foreground font-semibold rounded-md bg-transparent lg:font-extrabold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Add a title..."
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleInteraction("title");
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex flex-row items-center justify-between">
                                Content
                                <span
                                    className={`ml-2 text-sm ${getCounterClass(
                                        contentValue,
                                        5,
                                        500,
                                        hasInteracted.content
                                    )}`}
                                >
                                    {contentValue.length} / 500
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="w-full border-input rounded-md bg-formfield text-formfield-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Content..."
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleInteraction("content");
                                    }}
                                />
                            </FormControl>
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
                                <Input
                                    className="border-input bg-formfield"
                                    placeholder="Full Text URL..."
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleInteraction("fullTextUrl");
                                    }}
                                />
                            </FormControl>
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
                                <Input
                                    className="border-input bg-formfield"
                                    placeholder="Wikipedia URL..."
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleInteraction("wikipediaUrl");
                                    }}
                                />
                            </FormControl>
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
                                    <SelectTrigger className="bg-formfield border-input">
                                        <SelectValue placeholder="Select a voice..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-formfield border-input">
                                        <SelectItem value="D38z5RcWu1voky8WS1ja">
                                            Voice 1 - D38z5RcWu1voky8WS1ja
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-row items-center justify-center">
                    <Button
                        className="rounded-md bg-slate-500/20 backdrop-blur-sm text-foreground px-4 py-2 h-12 w-20"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default HighlightForm;
