import { useDispatch, useSelector } from 'react-redux'

import { HeaderText } from '../../../../components/ui'
import { ReactComponent as OptionsIcon } from '../../../../assets/icons/options.svg'
import classes from '../styles/TrashBar.module.css'
import { ConfirmDeleteModal, PopUpMenu } from '../../../../components/common/'
import useEmptyTheTrashNotes from '../hooks/use-empty-the-trash-notes'
import { uiActions } from '../../../../store/ui-slice'
const TrashBar = () =>
{
    // handle empty the trash
    const {
        isLoadingEmptyTheTrashNotes,
        handleEmptyTheTrashNotes
    } = useEmptyTheTrashNotes();
    const dispatch = useDispatch();
    const uiId = "allTrashNotesOptions";
    const isConfirmEmptyTheTrashOpen = useSelector(state => state.ui.isModalOpened)[uiId];

    const handleOpenConfirmEmptyTheTrash = () =>
    {
        dispatch(uiActions.openModal(uiId))
    }

    const handleCloseConfirmEmptyTheTrash = () =>
    {
        dispatch(uiActions.closeModal(uiId))
    }

    const menuItems = [
        {
            onClick: handleOpenConfirmEmptyTheTrash,
            children: "Delete all",
        }
    ];

    return (
        <div
            className={classes.container}
        >
            <HeaderText>
                Trash
            </HeaderText>

            {/* Options pop menu */}
            <PopUpMenu
                id={uiId}
                openBtnType="base"
                openBtnChild={
                    <OptionsIcon fill='var(--secondary)' />
                }
                openBtnClassName={classes.optionBtn}
                menuItems={menuItems}
            />

            {/* Confirm empty trash modal  */}
            <ConfirmDeleteModal
                open={!!isConfirmEmptyTheTrashOpen}
                onClose={handleCloseConfirmEmptyTheTrash}
                deleteMessage="All Notes"
                onDelete={handleEmptyTheTrashNotes}
                isLoading={isLoadingEmptyTheTrashNotes}
            />
        </div>
    )
}

export default TrashBar