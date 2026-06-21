"use client";

import * as React from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FieldShell({
  name,
  label,
  description,
  error,
  required,
  children,
  className,
}: {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function useFieldError(name: string): string | undefined {
  const {
    formState: { errors },
  } = useFormContext();
  const err = errors[name];
  return err?.message as string | undefined;
}

export function TextField<T extends FieldValues>({
  name,
  label,
  description,
  required,
  type = "text",
  placeholder,
  dir,
  className,
}: {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  className?: string;
}) {
  const { register } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell
      name={name}
      label={label}
      description={description}
      error={error}
      required={required}
      className={className}
    >
      <Input
        id={name}
        type={type}
        dir={dir}
        placeholder={placeholder}
        aria-invalid={!!error}
        {...register(name)}
      />
    </FieldShell>
  );
}

export function TextareaField<T extends FieldValues>({
  name,
  label,
  description,
  required,
  placeholder,
  rows = 5,
  className,
}: {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
}) {
  const { register } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell
      name={name}
      label={label}
      description={description}
      error={error}
      required={required}
      className={className}
    >
      <Textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={!!error}
        {...register(name)}
      />
    </FieldShell>
  );
}

export function SelectField<T extends FieldValues>({
  name,
  label,
  description,
  required,
  placeholder = "اختر...",
  options,
  className,
}: {
  name: Path<T>;
  label?: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  const { control } = useFormContext<T>();
  const error = useFieldError(name);
  return (
    <FieldShell
      name={name}
      label={label}
      description={description}
      error={error}
      required={required}
      className={className}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={name} aria-invalid={!!error}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FieldShell>
  );
}

export function SwitchField<T extends FieldValues>({
  name,
  label,
  description,
  className,
}: {
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
}) {
  const { control } = useFormContext<T>();
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border bg-card p-4",
        className
      )}
    >
      <div className="flex flex-col gap-0.5">
        {label && <Label htmlFor={name}>{label}</Label>}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Switch
            id={name}
            checked={!!field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
    </div>
  );
}

export function CheckboxField({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2.5 rounded-md border bg-card px-3 py-2.5 transition-colors hover:bg-muted/40"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(!!v)}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export function SubmitButton({
  children,
  pending,
  className,
}: {
  children: React.ReactNode;
  pending?: boolean;
  className?: string;
}) {
  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending && <Loader2 className="size-4 animate-spin" />}
      {children}
    </Button>
  );
}
