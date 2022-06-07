import styled from "styled-components";
import colors from "../../../shared/themes/Colors";
import { Search } from "@mui/icons-material";

export const IconInput = () => {
	return (
		<Search
			sx={{
				color: colors.colorIconLight,
                fontSize: 32,
                cursor: 'pointer'
			}}
		/>
	);
};
