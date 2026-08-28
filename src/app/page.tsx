import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PhoneInput } from "@/components/PhoneInput";
import { Checkbox } from "@/components/Checkbox";
import { Radio } from "@/components/Checkbox";
import { Toggle } from "@/components/Toggle";

export default function RootPage() {
  return (
    <main className="bg-primary-400">
      <h1 className="text-body-lg">Flexmot</h1>
      <Button>CClick here</Button>
      <Input label="Name" placeholder="Enter your name" />
      <PhoneInput label="Phone Number" placeholder="Enter your phone number" />
      <label className="flex items-center gap-2 text-body-sm">
        <Checkbox />
        I agree to the terms and conditions
      </label>
      <label className="flex items-center gap-2 text-body-sm">
        <Radio name="options" value="1" />
        Option 1
      </label>
      <label className="flex items-center gap-2 text-body-sm">
        <Radio name="options" value="2" />
        Option 2
      </label>
      <Toggle />
    </main>
  );
}
