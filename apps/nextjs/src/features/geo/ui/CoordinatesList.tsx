"use client";
import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import { VStack, HStack, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { CoordinatesPair } from "./CoordinatesPair";
import type { FormValues } from "../model/form.schema";

type Props = {
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
};



export function CoordinatesList({ control, errors }: Props) {
    const { fields, append, remove } = useFieldArray({ control, name: "points" });
    const safeRemove = (idx: number) => {
        // Guard: never remove if length <= 2 or trying to remove one of the first two
        if (fields.length <= 2 || idx < 2) return;
        remove(idx);
      };

    return (
        <VStack align="stretch" gap={4}>
            {fields.map((f, idx) => (
                <HStack key={f.id} align="flex-start" gap={2}>
                    <CoordinatesPair
                        control={control}
                        errors={errors}
                        index={idx}
                        removable={idx >= 2}
                        onRemove={() => safeRemove(idx)}
                    />
                </HStack>
            ))}

            <IconButton
                aria-label="Add pair"
                onClick={() => append({ lat: undefined as unknown as number, lng: undefined as unknown as number })}
                _icon={{ width: "18px", height: "18px" }}

            >
                <AddIcon />
            </IconButton>
        </VStack>
    );
}