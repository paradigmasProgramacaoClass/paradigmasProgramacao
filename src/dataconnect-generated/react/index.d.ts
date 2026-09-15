import { CreateUserData, UpdateUserData, DeleteUserData, GetCurrentUserData, ListUsersData, CreateClinicData, UpdateClinicData, DeleteClinicData, GetClinicData, ListClinicsData, CreateAppointmentData, UpdateAppointmentData, DeleteAppointmentData, GetAppointmentData, ListMyAppointmentsData, CreateAppointmentHistoryData, UpdateAppointmentHistoryData, DeleteAppointmentHistoryData, GetAppointmentHistoryData, ListHistoryForAppointmentData, CreateAvailabilityData, UpdateAvailabilityData, DeleteAvailabilityData, GetAvailabilityData, ListDoctorAvailabilityData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, void>): UseDataConnectMutationResult<UpdateUserData, undefined>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateClinic(options?: useDataConnectMutationOptions<CreateClinicData, FirebaseError, void>): UseDataConnectMutationResult<CreateClinicData, undefined>;
export function useCreateClinic(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClinicData, FirebaseError, void>): UseDataConnectMutationResult<CreateClinicData, undefined>;

export function useUpdateClinic(options?: useDataConnectMutationOptions<UpdateClinicData, FirebaseError, void>): UseDataConnectMutationResult<UpdateClinicData, undefined>;
export function useUpdateClinic(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateClinicData, FirebaseError, void>): UseDataConnectMutationResult<UpdateClinicData, undefined>;

export function useDeleteClinic(options?: useDataConnectMutationOptions<DeleteClinicData, FirebaseError, void>): UseDataConnectMutationResult<DeleteClinicData, undefined>;
export function useDeleteClinic(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteClinicData, FirebaseError, void>): UseDataConnectMutationResult<DeleteClinicData, undefined>;

export function useGetClinic(options?: useDataConnectQueryOptions<GetClinicData>): UseDataConnectQueryResult<GetClinicData, undefined>;
export function useGetClinic(dc: DataConnect, options?: useDataConnectQueryOptions<GetClinicData>): UseDataConnectQueryResult<GetClinicData, undefined>;

export function useListClinics(options?: useDataConnectQueryOptions<ListClinicsData>): UseDataConnectQueryResult<ListClinicsData, undefined>;
export function useListClinics(dc: DataConnect, options?: useDataConnectQueryOptions<ListClinicsData>): UseDataConnectQueryResult<ListClinicsData, undefined>;

export function useCreateAppointment(options?: useDataConnectMutationOptions<CreateAppointmentData, FirebaseError, void>): UseDataConnectMutationResult<CreateAppointmentData, undefined>;
export function useCreateAppointment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAppointmentData, FirebaseError, void>): UseDataConnectMutationResult<CreateAppointmentData, undefined>;

export function useUpdateAppointment(options?: useDataConnectMutationOptions<UpdateAppointmentData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAppointmentData, undefined>;
export function useUpdateAppointment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAppointmentData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAppointmentData, undefined>;

export function useDeleteAppointment(options?: useDataConnectMutationOptions<DeleteAppointmentData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAppointmentData, undefined>;
export function useDeleteAppointment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAppointmentData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAppointmentData, undefined>;

export function useGetAppointment(options?: useDataConnectQueryOptions<GetAppointmentData>): UseDataConnectQueryResult<GetAppointmentData, undefined>;
export function useGetAppointment(dc: DataConnect, options?: useDataConnectQueryOptions<GetAppointmentData>): UseDataConnectQueryResult<GetAppointmentData, undefined>;

export function useListMyAppointments(options?: useDataConnectQueryOptions<ListMyAppointmentsData>): UseDataConnectQueryResult<ListMyAppointmentsData, undefined>;
export function useListMyAppointments(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyAppointmentsData>): UseDataConnectQueryResult<ListMyAppointmentsData, undefined>;

export function useCreateAppointmentHistory(options?: useDataConnectMutationOptions<CreateAppointmentHistoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateAppointmentHistoryData, undefined>;
export function useCreateAppointmentHistory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAppointmentHistoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateAppointmentHistoryData, undefined>;

export function useUpdateAppointmentHistory(options?: useDataConnectMutationOptions<UpdateAppointmentHistoryData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAppointmentHistoryData, undefined>;
export function useUpdateAppointmentHistory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAppointmentHistoryData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAppointmentHistoryData, undefined>;

export function useDeleteAppointmentHistory(options?: useDataConnectMutationOptions<DeleteAppointmentHistoryData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAppointmentHistoryData, undefined>;
export function useDeleteAppointmentHistory(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAppointmentHistoryData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAppointmentHistoryData, undefined>;

export function useGetAppointmentHistory(options?: useDataConnectQueryOptions<GetAppointmentHistoryData>): UseDataConnectQueryResult<GetAppointmentHistoryData, undefined>;
export function useGetAppointmentHistory(dc: DataConnect, options?: useDataConnectQueryOptions<GetAppointmentHistoryData>): UseDataConnectQueryResult<GetAppointmentHistoryData, undefined>;

export function useListHistoryForAppointment(options?: useDataConnectQueryOptions<ListHistoryForAppointmentData>): UseDataConnectQueryResult<ListHistoryForAppointmentData, undefined>;
export function useListHistoryForAppointment(dc: DataConnect, options?: useDataConnectQueryOptions<ListHistoryForAppointmentData>): UseDataConnectQueryResult<ListHistoryForAppointmentData, undefined>;

export function useCreateAvailability(options?: useDataConnectMutationOptions<CreateAvailabilityData, FirebaseError, void>): UseDataConnectMutationResult<CreateAvailabilityData, undefined>;
export function useCreateAvailability(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAvailabilityData, FirebaseError, void>): UseDataConnectMutationResult<CreateAvailabilityData, undefined>;

export function useUpdateAvailability(options?: useDataConnectMutationOptions<UpdateAvailabilityData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAvailabilityData, undefined>;
export function useUpdateAvailability(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAvailabilityData, FirebaseError, void>): UseDataConnectMutationResult<UpdateAvailabilityData, undefined>;

export function useDeleteAvailability(options?: useDataConnectMutationOptions<DeleteAvailabilityData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAvailabilityData, undefined>;
export function useDeleteAvailability(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAvailabilityData, FirebaseError, void>): UseDataConnectMutationResult<DeleteAvailabilityData, undefined>;

export function useGetAvailability(options?: useDataConnectQueryOptions<GetAvailabilityData>): UseDataConnectQueryResult<GetAvailabilityData, undefined>;
export function useGetAvailability(dc: DataConnect, options?: useDataConnectQueryOptions<GetAvailabilityData>): UseDataConnectQueryResult<GetAvailabilityData, undefined>;

export function useListDoctorAvailability(options?: useDataConnectQueryOptions<ListDoctorAvailabilityData>): UseDataConnectQueryResult<ListDoctorAvailabilityData, undefined>;
export function useListDoctorAvailability(dc: DataConnect, options?: useDataConnectQueryOptions<ListDoctorAvailabilityData>): UseDataConnectQueryResult<ListDoctorAvailabilityData, undefined>;
