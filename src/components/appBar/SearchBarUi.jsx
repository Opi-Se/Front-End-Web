import { CircularProgress, IconButton, InputBase } from '@mui/material'
import { Field } from 'formik'

import classes from './styles/SearchBar.module.css'
import { FormikContainer } from '../inputs'
import searchIcon from '../../assets/icons/search.svg'
export const SearchBarUi = ({ handleSearchForPartner, isLoadingSearchForPartner, fullWidth }) =>
{
    return (
        <FormikContainer
            initialValues={{ userId: "" }}
            onSubmit={handleSearchForPartner}
        >
            <Field name="userId">
                {({ field }) => (
                    <InputBase
                        className={`${classes.searchInput} ${fullWidth ? classes.full : ""}`}
                        name="userId"
                        placeholder="Search your study partner..."
                        startAdornment={
                            isLoadingSearchForPartner ?
                                <CircularProgress size={20} sx={{ margin: 1, color: "var(--secondary)" }} /> :
                                <IconButton
                                    sx={{
                                        marginRight: 1,
                                        padding: 0,
                                    }}
                                    type='submit'
                                    disabled={isLoadingSearchForPartner || field.value.trim() === ""}
                                    title="Search..."
                                >
                                    <img
                                        src={searchIcon}
                                        alt='search icon'
                                    />
                                </IconButton>
                        }
                        disabled={isLoadingSearchForPartner}
                        {...field}
                    />
                )}
            </Field>
        </FormikContainer>
    )
}
