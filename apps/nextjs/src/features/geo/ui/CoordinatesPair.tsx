"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { HStack, IconButton } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import type { FormValues } from "../model/form.schema";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  index: number;
  removable?: boolean;
  onRemove?: () => void;
};

export function CoordinatesPair({ control, errors, index, removable, onRemove}: Props) {
  const latName = `points.${index}.lat` as const;
  const lngName = `points.${index}.lng` as const;

  return (
    <HStack align="flex-start" gap={4}>
      <FormControl isInvalid={!!errors.points?.[index]?.lat}>
        <FormLabel>Lat #{index + 1}</FormLabel>
        <Controller
          name={latName}
          control={control}
          rules={{ required: "Lat required" }}
          render={({ field }) => (
            <NumberInput
              value={field.value ?? ""}
              onChange={(_, num) => field.onChange(Number.isNaN(num) ? "" : num)}
              min={-90}
              max={90}
              step={0.0001}
            >
              <NumberInputField placeholder="e.g., 4.7111" />
            </NumberInput>
          )}
        />
        <FormErrorMessage>
          {errors.points?.[index]?.lat?.message as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.points?.[index]?.lng}>
        <FormLabel>Long #{index + 1}</FormLabel>
        <Controller
          name={lngName}
          control={control}
          rules={{ required: "Long required" }}
          render={({ field }) => (
            <NumberInput
              value={field.value ?? ""}
              onChange={(_, num) => field.onChange(Number.isNaN(num) ? "" : num)}
              min={-180}
              max={180}
              step={0.0001}
            >
              <NumberInputField placeholder="e.g., -74.0721" />
            </NumberInput>
          )}
        />
        <FormErrorMessage>
          {errors.points?.[index]?.lng?.message as string}
        </FormErrorMessage>
      </FormControl>
      {removable ? (
        <IconButton aria-label="Remove pair" variant="outline" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </HStack>
  );
}