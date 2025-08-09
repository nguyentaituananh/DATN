import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantityInputProps {
    initialValue: number;
    maxValue: number;
    onUpdate: (newQuantity: number) => void;
    onImmediateUpdate: (newQuantity: number) => void; 
}

export const QuantityInput: React.FC<QuantityInputProps> = ({ initialValue, maxValue, onUpdate, onImmediateUpdate }) => {
    const [quantity, setQuantity] = useState(initialValue);

    useEffect(() => {
        setQuantity(initialValue);
    }, [initialValue]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setQuantity(NaN);
            return;
        }
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 1 && numValue <= maxValue) {
            setQuantity(numValue);
            onUpdate(numValue);
        }
    };

    const handleBlur = () => {
        if (isNaN(quantity)) {
            setQuantity(initialValue);
        }
    };

    const adjustQuantity = (amount: number) => {
        const newQuantity = Math.max(1, Math.min(quantity + amount, maxValue));
        setQuantity(newQuantity);
        onImmediateUpdate(newQuantity);
        onUpdate(newQuantity);
    };

    return (
        <div className="flex items-center border rounded-md">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => adjustQuantity(-1)}
                disabled={quantity <= 1}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="text"
                value={isNaN(quantity) ? '' : quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="w-12 text-center font-medium border-0 focus-visible:ring-0"
            />
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => adjustQuantity(1)}
                disabled={quantity >= maxValue}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
};
