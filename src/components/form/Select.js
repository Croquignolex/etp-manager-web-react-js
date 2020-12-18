import Select from 'react-select';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';

// Component
function AppFormSelect({id, multi, label, data, title, input, requestProcessing, handleInput}) {
    // Data
    const {val, message, isValid} = input;

    // Build default value
    const defaultValue = useMemo(() => {
         if(!multi) return findIntoData(val, data);
         else {
             const returnedValue = [];
             val.forEach(item => {
                 const found = findIntoData(item, data);
                 found && returnedValue.push(found)
             });
             return returnedValue;
         }
    }, [val, data, multi]);

    // Custom style in case oed error
    const customStyles = useMemo(() => {
        return isValid ? {} : {
            control: (provided) => ({...provided, border: '1px solid #e22529'}),
            singleValue: (provided) => {
                const color = '#e22529';
                return {...provided, color}
            }
        }
    }, [isValid]);

    // Render
    return (
        <>
            <div className='mb-3'>
                <label htmlFor={id}>{label}</label>
                <Select options={data}
                        isMulti={multi}
                        placeholder={title}
                        value={defaultValue}
                        styles={customStyles}
                        isLoading={requestProcessing}
                        onChange={(selected) => {
                            if(!multi) handleInput(true, selected.value);
                            else {
                                let handler = [];
                                selected && selected.forEach(item => handler.push(item.value));
                                handleInput(true, handler);
                            }
                        }}
                />
                <small className={'text-danger'}>{!isValid && message}</small>
            </div>
        </>
    )
}

// Find into data array
function findIntoData(needle, dataArray) {
    return dataArray.find(item => needle.toString() === item.value.toString());
}

// Prop types to ensure destroyed props data type
AppFormSelect.propTypes = {
    multi: PropTypes.bool,
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    handleInput: PropTypes.func.isRequired,
    requestProcessing: PropTypes.bool.isRequired,
};


// Prop types to ensure destroyed props data type
AppFormSelect.defaultProps = {
    multi: false
};

export default React.memo(AppFormSelect);