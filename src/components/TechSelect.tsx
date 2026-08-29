"use client";

import Select, { Props as SelectProps, components, OptionProps, MultiValueGenericProps } from "react-select";

const CustomOption = (props: OptionProps<any>) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        {props.data.icon && (
          <img src={`/icons/default/${props.data.icon}`} alt="" className="w-4 h-4 object-contain" />
        )}
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );
};

const CustomMultiValueLabel = (props: MultiValueGenericProps<any>) => {
  return (
    <components.MultiValueLabel {...props}>
      <div className="flex items-center gap-1.5 px-1">
        {props.data.icon && (
          <img src={`/icons/default/${props.data.icon}`} alt="" className="w-3.5 h-3.5 object-contain" />
        )}
        <span>{props.data.label}</span>
      </div>
    </components.MultiValueLabel>
  );
};

export default function TechSelect(props: SelectProps) {
  // Custom filter to also search by tags
  const customFilter = (option: any, inputValue: string) => {
    if (!inputValue) return true;
    const val = inputValue.toLowerCase();
    
    // Standard label and value check
    if (option.label.toLowerCase().includes(val)) return true;
    if (option.value.toLowerCase().includes(val)) return true;
    
    // Tag check
    if (option.data?.tags?.some((tag: string) => tag.toLowerCase().includes(val))) {
      return true;
    }
    
    return false;
  };

  return (
    <Select
      {...props}
      filterOption={customFilter}
      components={{
        Option: CustomOption,
        MultiValueLabel: CustomMultiValueLabel,
        ...props.components
      }}
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: '#18181b',
          borderColor: state.isFocused ? '#71717a' : '#27272a',
          color: '#f4f4f5',
          boxShadow: 'none',
          '&:hover': { borderColor: '#71717a' }
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: '#18181b',
          border: '1px solid #27272a',
        }),
        groupHeading: (base) => ({
          ...base,
          color: '#a1a1aa',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          padding: '8px 12px',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? '#27272a' : '#18181b',
          color: '#f4f4f5',
          '&:active': { backgroundColor: '#3f3f46' }
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: '#27272a',
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: '#f4f4f5',
          padding: 0,
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: '#a1a1aa',
          '&:hover': { backgroundColor: '#ef4444', color: '#fff' }
        }),
        input: (base) => ({
          ...base,
          color: '#f4f4f5',
        }),
        ...props.styles,
      }}
    />
  );
}
