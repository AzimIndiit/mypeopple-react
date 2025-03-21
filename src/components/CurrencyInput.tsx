import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/helper";

interface CurrencyInputProps {
  control: any;
  name: string;
  label: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ control, name, label }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              className="w-full"
              onFocus={() => setIsFocused(true)}
         
              inputMode="numeric"
              pattern="[0-9]*"
              {...field}
              onBlur={() => setIsFocused(false)}
              value={isFocused ? field.value : formatCurrency(Number(field.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CurrencyInput;
