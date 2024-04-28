import { useEffect } from 'react'
import useHttp from '../../../../../hooks/use-http';
import { useDispatch, useSelector } from 'react-redux';
import useScrollingPagination from '../../../../../hooks/use-scrolling-pagination';
import { tasksActions } from '../../../../../store/tasks-slice';
import { taskModulePath } from '../../../../../config';

const useGetSpecificTasksType = (tasksType) =>
{
    // useGetSpecificTasksType hook to handle call getSpecificTasksType API

    const {
        sendRequest: specificTasksType,
        isLoading: isLoadingSpecificTasksType,
    } = useHttp();
    const matchId = useSelector(state => state.auth.userData.matchId);
    const dispatch = useDispatch();

    // handle pagination 
    const initialTotalPages = useSelector(state => state.tasks.totalPages[tasksType]);

    const {
        lastElementRef,
        currentPage
    } = useScrollingPagination(isLoadingSpecificTasksType, initialTotalPages);

    useEffect(() =>
    {
        const getResponse = ({ message, data, totalPages, totalNumOfItems }) =>
        {
            if (message.includes("success"))
            {
                // update store with new notes
                dispatch(tasksActions.mergeTasks({ tasksType, tasks: data }))

                // update total pages in store
                dispatch(tasksActions.updateTotalPages({ tasksType, totalPages }))

                // update total length in store
                dispatch(tasksActions.updateTotalLength({ tasksType, totalLength: totalNumOfItems }))
            }
        };

        specificTasksType(
            {
                url: `${taskModulePath}/getSpecificTasksType?matchId=${matchId}&page=${currentPage + 1}&limit=${20}&type=${tasksType}`,
            },
            getResponse
        );
    }, [currentPage, dispatch, matchId, specificTasksType, tasksType])

    return {
        isLoadingSpecificTasksType,
        lastElementRef,
    }
}

export default useGetSpecificTasksType