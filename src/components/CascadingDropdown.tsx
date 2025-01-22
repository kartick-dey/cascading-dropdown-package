import React, { useState } from 'react';

const isEmpty = (obj: Record<string, string>) => {
    return Object.keys(obj).length === 0;
};

export interface DropdownOption {
    label: string;
    value: string;
}

export interface CascadingDropdownProps {
    data: Record<string, DropdownOption[]>; // Key-value pairs where key is parent value and value is child options
    currentSelectedValues: Record<string, string>;
    hierarchy: string[]; // Order of dropdowns
    onSelectionChange: (selectedValues: Record<string, string>) => void;
}

/**
 * A React functional component that renders a cascading dropdown menu.
 * 
 * @param {CascadingDropdownProps} props - The properties for the CascadingDropdown component.
 * @param {Record<string, DropdownOption[]>} props.data - An object containing the dropdown options for each level.
 * @param {string[]} props.hierarchy - An array representing the hierarchy of dropdown levels.
 * @param {(selectedValues: Record<string, string>) => void} props.onSelectionChange - A callback function that is called when the selection changes.
 * @param {Record<string, string>} [props.currentSelectedValues] - An optional object containing the current selected values for each level.
 * 
 * @returns {JSX.Element} The rendered cascading dropdown component.
 * 
 * @example
 * ```tsx
 * const data = {
 *   country: [{ label: 'USA', value: 'usa' }, { label: 'Canada', value: 'canada' }],
 *   state: [{ label: 'California', value: 'california' }, { label: 'Texas', value: 'texas' }],
 *   city: [{ label: 'Los Angeles', value: 'losangeles' }, { label: 'San Francisco', value: 'sanfrancisco' }]
 * };
 * const hierarchy = ['country', 'state', 'city'];
 * const handleSelectionChange = (selectedValues) => {
 *   console.log(selectedValues);
 * };
 * 
 * <CascadingDropdown data={data} hierarchy={hierarchy} onSelectionChange={handleSelectionChange} />
 * ```
 */
const CascadingDropdown: React.FC<CascadingDropdownProps> = ({ data, hierarchy, onSelectionChange, currentSelectedValues }) => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>(isEmpty(currentSelectedValues) ? {} : currentSelectedValues);

    const handleChange = (level: string, value: string) => {
        const newSelectedValues = { ...selectedValues, [level]: value };

        // Clear child selections if a parent changes
        const levelIndex = hierarchy.indexOf(level);
        const levelsToClear = hierarchy.slice(levelIndex + 1);
        levelsToClear.forEach((key) => delete newSelectedValues[key]);

        setSelectedValues(newSelectedValues);
        onSelectionChange(selectedValues);
    };

    const renderDropdowns = () => {
        return hierarchy.map((level, index) => {
            const options: Array<DropdownOption> = data[level]?.length > 0 ? data[level] : [];
            return (
                <div key={level} style={{ marginBottom: '10px' }}>
                    <label htmlFor={`dropdown-${level}`}>Select {level}:</label>
                    <select id={`dropdown-${level}`} value={selectedValues[level] || ''} onChange={(e) => handleChange(level, e.target.value)}>
                        <option value=''>-- Select --</option>
                        {options.length &&
                            options.map((option: DropdownOption, optIndex: number) => (
                                <option key={`${index + optIndex + ''}-${level}-${option.label}`} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                    </select>
                </div>
            );
        });
    };

    return <div>{renderDropdowns()}</div>;
};

export default CascadingDropdown;
