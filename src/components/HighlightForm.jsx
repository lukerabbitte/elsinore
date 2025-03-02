"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
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
import { createHighlight } from "@/lib/actions/createHighlight";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
        .max(1000, {
            message: "Content must be at most 1000 characters.",
        }),
    fullTextUrl: z.string().url({
        message: "Must be a valid URL.",
    }),
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
            voiceId: "",
        },
    });

    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (success) {
            toast({
                title: "Stay curious.",
                description: `Thank you: Elsinore successfully created your highlight: ${form.getValues(
                    "title"
                )}.`,
            });
            form.reset();
            setHasInteracted({ title: false, content: false });
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Ah no!",
                description: "Elsinore couldn't generate your highlight. Try again?",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    }, [error]);

    const onSubmit = async (values) => {
        setLoading(true);
        setSuccess(false);
        setError(false);

        try {
            const newHighlight = await createHighlight(values);
            setSuccess(true);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
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
                className="space-y-8 bg-gradient-radial p-4 w-full max-w-prose rounded-xl z-10"
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
                                    className="w-full truncate text-2xl text-foreground placeholder:text-foreground font-semibold rounded-md bg-transparent lg:font-extrabold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                                        1000,
                                        hasInteracted.content
                                    )}`}
                                >
                                    {contentValue.length} / 1000
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
                                        <SelectItem value="8SNzJpKT62Cqqqe8Injx">
                                            Michael - A male Irish storytelling voice
                                        </SelectItem>
                                        <SelectItem value="wYiPSnV1DhrUtMgJiRr1">
                                            Megan - A young female Northern Irish voice
                                        </SelectItem>
                                        <SelectItem value="SAz9YHcvj6GT2YYXdXww">
                                            River - A young female American voice
                                        </SelectItem>
                                        <SelectItem value="onwK4e9ZLuTAKqWW03F9">
                                            Daniel - An authoritative British news voice
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-row items-center justify-center">
                    <Button
                        className="rounded-md bg-slate-500/20 backdrop-blur-sm text-foreground px-4 py-2 h-12 w-20 hover:scale-105 transition-all duration-300"
                        type="submit"
                        disabled={loading}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default HighlightForm;
