import styled from "styled-components"
import { useDisplayContext } from "../../providers/DisplayProvider"

export function NumberButton({
    number
}: {
    number: string
}) {

    const { digits, operation, slot1, slot2, isFloat, isError, setDigits, setSlot1, setSlot2, setIsNegative } = useDisplayContext()

    function handleClick() {
        if (setDigits && setSlot1 && setSlot2 && setIsNegative && !isError) {

            let value
            if (slot1 === null || slot1 === 0) {
                value = isFloat ? "0." + number : number
                setSlot1(Math.abs(Number(value)))
                setIsNegative(false)
            } else if (operation === null) {
                if (slot1.toString().split("").filter(s => s !== ".").length < 8) {
                    value = digits + number
                    setSlot1(Math.abs(Number(value)))
                }
            } else if (slot2 === null || slot2 === 0) {
                value = isFloat ? "0." + number : number
                setIsNegative(false)
                setSlot2(Math.abs(Number(value)))
            } else if (digits.length < 8) {
                value = digits + number
                setSlot2(Math.abs(Number(value)))
            }

            if (value) {
                setDigits(value)
            }
        }
    }

    return <>
        <Button
            number={number}
            onClick={() => handleClick()}
        />
    </>
}

const Button = styled.button<{ number: string }>`
    width: 44px;
    height: 40px;
    border: none;
    background-color: transparent;
    background-image: url("../src/assets/btn-${(props) => props.number}.png");
    cursor: pointer;
    &:active {
        background-image: url("../src/assets/btn-${(props) => props.number}-click.png");     
    }
`