import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const Textarea: React.FC<InputProps> = ({
  name,
  placeholder,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, registerField } = useField(name);

  const handleTextAreaBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleTextAreaFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <textarea
        placeholder={placeholder}
        cols={80}
        rows={20}
        ref={inputRef}
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        {...rest}
      />
    </Container>
  );
};

export default Textarea;
