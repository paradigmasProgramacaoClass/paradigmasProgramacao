import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AppointmentHistory_Key {
  id: UUIDString;
  __typename?: 'AppointmentHistory_Key';
}

export interface Appointment_Key {
  id: UUIDString;
  __typename?: 'Appointment_Key';
}

export interface Availability_Key {
  id: UUIDString;
  __typename?: 'Availability_Key';
}

export interface Clinic_Key {
  id: UUIDString;
  __typename?: 'Clinic_Key';
}

export interface CreateAppointmentData {
  appointment_insert: Appointment_Key;
}

export interface CreateAppointmentHistoryData {
  appointmentHistory_insert: AppointmentHistory_Key;
}

export interface CreateAvailabilityData {
  availability_insert: Availability_Key;
}

export interface CreateClinicData {
  clinic_insert: Clinic_Key;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface DeleteAppointmentData {
  appointment_delete?: Appointment_Key | null;
}

export interface DeleteAppointmentHistoryData {
  appointmentHistory_delete?: AppointmentHistory_Key | null;
}

export interface DeleteAvailabilityData {
  availability_delete?: Availability_Key | null;
}

export interface DeleteClinicData {
  clinic_delete?: Clinic_Key | null;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface GetAppointmentData {
  appointment?: {
    startTime: TimestampString;
    status: string;
    patient: {
      name: string;
    };
  };
}

export interface GetAppointmentHistoryData {
  appointmentHistory?: {
    newStatus: string;
    timestamp: TimestampString;
  };
}

export interface GetAvailabilityData {
  availability?: {
    startTime: string;
    endTime: string;
  };
}

export interface GetClinicData {
  clinic?: {
    name: string;
    address: string;
    phone?: string | null;
  };
}

export interface GetCurrentUserData {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export interface ListClinicsData {
  clinics: ({
    name: string;
    address: string;
  })[];
}

export interface ListDoctorAvailabilityData {
  availabilities: ({
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  })[];
}

export interface ListHistoryForAppointmentData {
  appointmentHistories: ({
    newStatus: string;
    timestamp: TimestampString;
  })[];
}

export interface ListMyAppointmentsData {
  appointments: ({
    startTime: TimestampString;
    status: string;
    clinic: {
      name: string;
    };
  })[];
}

export interface ListUsersData {
  users: ({
    name: string;
    role: string;
  })[];
}

export interface UpdateAppointmentData {
  appointment_update?: Appointment_Key | null;
}

export interface UpdateAppointmentHistoryData {
  appointmentHistory_update?: AppointmentHistory_Key | null;
}

export interface UpdateAvailabilityData {
  availability_update?: Availability_Key | null;
}

export interface UpdateClinicData {
  clinic_update?: Clinic_Key | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(): MutationPromise<UpdateUserData, undefined>;
export function updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateClinicRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateClinicData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateClinicData, undefined>;
  operationName: string;
}
export const createClinicRef: CreateClinicRef;

export function createClinic(): MutationPromise<CreateClinicData, undefined>;
export function createClinic(dc: DataConnect): MutationPromise<CreateClinicData, undefined>;

interface UpdateClinicRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateClinicData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateClinicData, undefined>;
  operationName: string;
}
export const updateClinicRef: UpdateClinicRef;

export function updateClinic(): MutationPromise<UpdateClinicData, undefined>;
export function updateClinic(dc: DataConnect): MutationPromise<UpdateClinicData, undefined>;

interface DeleteClinicRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteClinicData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteClinicData, undefined>;
  operationName: string;
}
export const deleteClinicRef: DeleteClinicRef;

export function deleteClinic(): MutationPromise<DeleteClinicData, undefined>;
export function deleteClinic(dc: DataConnect): MutationPromise<DeleteClinicData, undefined>;

interface GetClinicRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetClinicData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetClinicData, undefined>;
  operationName: string;
}
export const getClinicRef: GetClinicRef;

export function getClinic(options?: ExecuteQueryOptions): QueryPromise<GetClinicData, undefined>;
export function getClinic(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetClinicData, undefined>;

interface ListClinicsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClinicsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListClinicsData, undefined>;
  operationName: string;
}
export const listClinicsRef: ListClinicsRef;

export function listClinics(options?: ExecuteQueryOptions): QueryPromise<ListClinicsData, undefined>;
export function listClinics(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClinicsData, undefined>;

interface CreateAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAppointmentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateAppointmentData, undefined>;
  operationName: string;
}
export const createAppointmentRef: CreateAppointmentRef;

export function createAppointment(): MutationPromise<CreateAppointmentData, undefined>;
export function createAppointment(dc: DataConnect): MutationPromise<CreateAppointmentData, undefined>;

interface UpdateAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAppointmentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateAppointmentData, undefined>;
  operationName: string;
}
export const updateAppointmentRef: UpdateAppointmentRef;

export function updateAppointment(): MutationPromise<UpdateAppointmentData, undefined>;
export function updateAppointment(dc: DataConnect): MutationPromise<UpdateAppointmentData, undefined>;

interface DeleteAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAppointmentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteAppointmentData, undefined>;
  operationName: string;
}
export const deleteAppointmentRef: DeleteAppointmentRef;

export function deleteAppointment(): MutationPromise<DeleteAppointmentData, undefined>;
export function deleteAppointment(dc: DataConnect): MutationPromise<DeleteAppointmentData, undefined>;

interface GetAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAppointmentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAppointmentData, undefined>;
  operationName: string;
}
export const getAppointmentRef: GetAppointmentRef;

export function getAppointment(options?: ExecuteQueryOptions): QueryPromise<GetAppointmentData, undefined>;
export function getAppointment(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAppointmentData, undefined>;

interface ListMyAppointmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAppointmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyAppointmentsData, undefined>;
  operationName: string;
}
export const listMyAppointmentsRef: ListMyAppointmentsRef;

export function listMyAppointments(options?: ExecuteQueryOptions): QueryPromise<ListMyAppointmentsData, undefined>;
export function listMyAppointments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAppointmentsData, undefined>;

interface CreateAppointmentHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAppointmentHistoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateAppointmentHistoryData, undefined>;
  operationName: string;
}
export const createAppointmentHistoryRef: CreateAppointmentHistoryRef;

export function createAppointmentHistory(): MutationPromise<CreateAppointmentHistoryData, undefined>;
export function createAppointmentHistory(dc: DataConnect): MutationPromise<CreateAppointmentHistoryData, undefined>;

interface UpdateAppointmentHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAppointmentHistoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateAppointmentHistoryData, undefined>;
  operationName: string;
}
export const updateAppointmentHistoryRef: UpdateAppointmentHistoryRef;

export function updateAppointmentHistory(): MutationPromise<UpdateAppointmentHistoryData, undefined>;
export function updateAppointmentHistory(dc: DataConnect): MutationPromise<UpdateAppointmentHistoryData, undefined>;

interface DeleteAppointmentHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAppointmentHistoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteAppointmentHistoryData, undefined>;
  operationName: string;
}
export const deleteAppointmentHistoryRef: DeleteAppointmentHistoryRef;

export function deleteAppointmentHistory(): MutationPromise<DeleteAppointmentHistoryData, undefined>;
export function deleteAppointmentHistory(dc: DataConnect): MutationPromise<DeleteAppointmentHistoryData, undefined>;

interface GetAppointmentHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAppointmentHistoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAppointmentHistoryData, undefined>;
  operationName: string;
}
export const getAppointmentHistoryRef: GetAppointmentHistoryRef;

export function getAppointmentHistory(options?: ExecuteQueryOptions): QueryPromise<GetAppointmentHistoryData, undefined>;
export function getAppointmentHistory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAppointmentHistoryData, undefined>;

interface ListHistoryForAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListHistoryForAppointmentData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListHistoryForAppointmentData, undefined>;
  operationName: string;
}
export const listHistoryForAppointmentRef: ListHistoryForAppointmentRef;

export function listHistoryForAppointment(options?: ExecuteQueryOptions): QueryPromise<ListHistoryForAppointmentData, undefined>;
export function listHistoryForAppointment(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListHistoryForAppointmentData, undefined>;

interface CreateAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAvailabilityData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateAvailabilityData, undefined>;
  operationName: string;
}
export const createAvailabilityRef: CreateAvailabilityRef;

export function createAvailability(): MutationPromise<CreateAvailabilityData, undefined>;
export function createAvailability(dc: DataConnect): MutationPromise<CreateAvailabilityData, undefined>;

interface UpdateAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAvailabilityData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateAvailabilityData, undefined>;
  operationName: string;
}
export const updateAvailabilityRef: UpdateAvailabilityRef;

export function updateAvailability(): MutationPromise<UpdateAvailabilityData, undefined>;
export function updateAvailability(dc: DataConnect): MutationPromise<UpdateAvailabilityData, undefined>;

interface DeleteAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAvailabilityData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteAvailabilityData, undefined>;
  operationName: string;
}
export const deleteAvailabilityRef: DeleteAvailabilityRef;

export function deleteAvailability(): MutationPromise<DeleteAvailabilityData, undefined>;
export function deleteAvailability(dc: DataConnect): MutationPromise<DeleteAvailabilityData, undefined>;

interface GetAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAvailabilityData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAvailabilityData, undefined>;
  operationName: string;
}
export const getAvailabilityRef: GetAvailabilityRef;

export function getAvailability(options?: ExecuteQueryOptions): QueryPromise<GetAvailabilityData, undefined>;
export function getAvailability(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAvailabilityData, undefined>;

interface ListDoctorAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDoctorAvailabilityData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDoctorAvailabilityData, undefined>;
  operationName: string;
}
export const listDoctorAvailabilityRef: ListDoctorAvailabilityRef;

export function listDoctorAvailability(options?: ExecuteQueryOptions): QueryPromise<ListDoctorAvailabilityData, undefined>;
export function listDoctorAvailability(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDoctorAvailabilityData, undefined>;

