"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    VStack, Heading, Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useProcessPoints } from "../hooks/useProcessPoints";
import { ErrorAlert } from "./ErrorAlert";
import { ResultCard } from "./ResultCard";
import { FormSchema, FormValues } from "../model/form.schema";
import { CoordinatesList } from "./CoordinatesList";
import { GeoMap } from "./GeoMap"


export function GeoForm() {
    const toast = useToast();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        setError,
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            points: [
                { lat: 0, lng: 0 },
                { lat: 10, lng: 10 },
            ],
        },
    });

    const { status, data, error, run } = useProcessPoints();

    const onSubmit = (values: FormValues) => {
        if (!values.points?.length) {
            setError("points", { type: "required", message: "At least one coordinate pair is required" });
            return;
        }
        return run({ points: values.points });
    };

    const onInvalid = () => {
        toast({
            title: "Invalid form",
            description: "Check empty or out-of-range latitude/longitude fields.",
            status: "error",
            duration: 4000,
            isClosable: true,
        });
    };

    return (
        <VStack as="form" onSubmit={handleSubmit(onSubmit, onInvalid)} gap={4} align="stretch">
            <Heading size="md">Geo Processor</Heading>

            <CoordinatesList control={control} errors={errors} />

            <Button
                type="submit"
                loading={status === "loading" || isSubmitting}
                disabled={!isValid}
            >
                Process
            </Button>

            {error && <ErrorAlert message={error} />}
            {status === "success" && data && (
                <>
                    <ResultCard result={data} />
                    <GeoMap
                        key={JSON.stringify([data?.bounds, data?.centroid])}
                        result={data}
                    />
                </>
            )}
            {status !== "success" && (
                <GeoMap  />
            )}
        </VStack>
    );
}