type CalculateVolumeProps = {
    length: number;
    width: number;
    height: number;
    amount?: number;
};

type CalculateVolumeHelper = (props: CalculateVolumeProps) => number;
export const calculateVolume: CalculateVolumeHelper = ({ length, width, height, amount = 1 }) => length * width * height * amount;
