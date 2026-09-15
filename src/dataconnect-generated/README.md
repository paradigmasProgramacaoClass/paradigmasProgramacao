# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListUsers*](#listusers)
  - [*GetClinic*](#getclinic)
  - [*ListClinics*](#listclinics)
  - [*GetAppointment*](#getappointment)
  - [*ListMyAppointments*](#listmyappointments)
  - [*GetAppointmentHistory*](#getappointmenthistory)
  - [*ListHistoryForAppointment*](#listhistoryforappointment)
  - [*GetAvailability*](#getavailability)
  - [*ListDoctorAvailability*](#listdoctoravailability)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateClinic*](#createclinic)
  - [*UpdateClinic*](#updateclinic)
  - [*DeleteClinic*](#deleteclinic)
  - [*CreateAppointment*](#createappointment)
  - [*UpdateAppointment*](#updateappointment)
  - [*DeleteAppointment*](#deleteappointment)
  - [*CreateAppointmentHistory*](#createappointmenthistory)
  - [*UpdateAppointmentHistory*](#updateappointmenthistory)
  - [*DeleteAppointmentHistory*](#deleteappointmenthistory)
  - [*CreateAvailability*](#createavailability)
  - [*UpdateAvailability*](#updateavailability)
  - [*DeleteAvailability*](#deleteavailability)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    name: string;
    role: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetClinic
You can execute the `GetClinic` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getClinic(options?: ExecuteQueryOptions): QueryPromise<GetClinicData, undefined>;

interface GetClinicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetClinicData, undefined>;
}
export const getClinicRef: GetClinicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getClinic(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetClinicData, undefined>;

interface GetClinicRef {
  ...
  (dc: DataConnect): QueryRef<GetClinicData, undefined>;
}
export const getClinicRef: GetClinicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getClinicRef:
```typescript
const name = getClinicRef.operationName;
console.log(name);
```

### Variables
The `GetClinic` query has no variables.
### Return Type
Recall that executing the `GetClinic` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetClinicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetClinicData {
  clinic?: {
    name: string;
    address: string;
    phone?: string | null;
  };
}
```
### Using `GetClinic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getClinic } from '@dataconnect/generated';


// Call the `getClinic()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getClinic();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getClinic(dataConnect);

console.log(data.clinic);

// Or, you can use the `Promise` API.
getClinic().then((response) => {
  const data = response.data;
  console.log(data.clinic);
});
```

### Using `GetClinic`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getClinicRef } from '@dataconnect/generated';


// Call the `getClinicRef()` function to get a reference to the query.
const ref = getClinicRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getClinicRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.clinic);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.clinic);
});
```

## ListClinics
You can execute the `ListClinics` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listClinics(options?: ExecuteQueryOptions): QueryPromise<ListClinicsData, undefined>;

interface ListClinicsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClinicsData, undefined>;
}
export const listClinicsRef: ListClinicsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClinics(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClinicsData, undefined>;

interface ListClinicsRef {
  ...
  (dc: DataConnect): QueryRef<ListClinicsData, undefined>;
}
export const listClinicsRef: ListClinicsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClinicsRef:
```typescript
const name = listClinicsRef.operationName;
console.log(name);
```

### Variables
The `ListClinics` query has no variables.
### Return Type
Recall that executing the `ListClinics` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClinicsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListClinicsData {
  clinics: ({
    name: string;
    address: string;
  })[];
}
```
### Using `ListClinics`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClinics } from '@dataconnect/generated';


// Call the `listClinics()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClinics();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClinics(dataConnect);

console.log(data.clinics);

// Or, you can use the `Promise` API.
listClinics().then((response) => {
  const data = response.data;
  console.log(data.clinics);
});
```

### Using `ListClinics`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClinicsRef } from '@dataconnect/generated';


// Call the `listClinicsRef()` function to get a reference to the query.
const ref = listClinicsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClinicsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.clinics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.clinics);
});
```

## GetAppointment
You can execute the `GetAppointment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAppointment(options?: ExecuteQueryOptions): QueryPromise<GetAppointmentData, undefined>;

interface GetAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAppointmentData, undefined>;
}
export const getAppointmentRef: GetAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAppointment(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAppointmentData, undefined>;

interface GetAppointmentRef {
  ...
  (dc: DataConnect): QueryRef<GetAppointmentData, undefined>;
}
export const getAppointmentRef: GetAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAppointmentRef:
```typescript
const name = getAppointmentRef.operationName;
console.log(name);
```

### Variables
The `GetAppointment` query has no variables.
### Return Type
Recall that executing the `GetAppointment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAppointmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAppointmentData {
  appointment?: {
    startTime: TimestampString;
    status: string;
    patient: {
      name: string;
    };
  };
}
```
### Using `GetAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAppointment } from '@dataconnect/generated';


// Call the `getAppointment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAppointment();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAppointment(dataConnect);

console.log(data.appointment);

// Or, you can use the `Promise` API.
getAppointment().then((response) => {
  const data = response.data;
  console.log(data.appointment);
});
```

### Using `GetAppointment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAppointmentRef } from '@dataconnect/generated';


// Call the `getAppointmentRef()` function to get a reference to the query.
const ref = getAppointmentRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAppointmentRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appointment);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment);
});
```

## ListMyAppointments
You can execute the `ListMyAppointments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyAppointments(options?: ExecuteQueryOptions): QueryPromise<ListMyAppointmentsData, undefined>;

interface ListMyAppointmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAppointmentsData, undefined>;
}
export const listMyAppointmentsRef: ListMyAppointmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyAppointments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAppointmentsData, undefined>;

interface ListMyAppointmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyAppointmentsData, undefined>;
}
export const listMyAppointmentsRef: ListMyAppointmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyAppointmentsRef:
```typescript
const name = listMyAppointmentsRef.operationName;
console.log(name);
```

### Variables
The `ListMyAppointments` query has no variables.
### Return Type
Recall that executing the `ListMyAppointments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyAppointmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyAppointmentsData {
  appointments: ({
    startTime: TimestampString;
    status: string;
    clinic: {
      name: string;
    };
  })[];
}
```
### Using `ListMyAppointments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyAppointments } from '@dataconnect/generated';


// Call the `listMyAppointments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyAppointments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyAppointments(dataConnect);

console.log(data.appointments);

// Or, you can use the `Promise` API.
listMyAppointments().then((response) => {
  const data = response.data;
  console.log(data.appointments);
});
```

### Using `ListMyAppointments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyAppointmentsRef } from '@dataconnect/generated';


// Call the `listMyAppointmentsRef()` function to get a reference to the query.
const ref = listMyAppointmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyAppointmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appointments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appointments);
});
```

## GetAppointmentHistory
You can execute the `GetAppointmentHistory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAppointmentHistory(options?: ExecuteQueryOptions): QueryPromise<GetAppointmentHistoryData, undefined>;

interface GetAppointmentHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAppointmentHistoryData, undefined>;
}
export const getAppointmentHistoryRef: GetAppointmentHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAppointmentHistory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAppointmentHistoryData, undefined>;

interface GetAppointmentHistoryRef {
  ...
  (dc: DataConnect): QueryRef<GetAppointmentHistoryData, undefined>;
}
export const getAppointmentHistoryRef: GetAppointmentHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAppointmentHistoryRef:
```typescript
const name = getAppointmentHistoryRef.operationName;
console.log(name);
```

### Variables
The `GetAppointmentHistory` query has no variables.
### Return Type
Recall that executing the `GetAppointmentHistory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAppointmentHistoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAppointmentHistoryData {
  appointmentHistory?: {
    newStatus: string;
    timestamp: TimestampString;
  };
}
```
### Using `GetAppointmentHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAppointmentHistory } from '@dataconnect/generated';


// Call the `getAppointmentHistory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAppointmentHistory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAppointmentHistory(dataConnect);

console.log(data.appointmentHistory);

// Or, you can use the `Promise` API.
getAppointmentHistory().then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory);
});
```

### Using `GetAppointmentHistory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAppointmentHistoryRef } from '@dataconnect/generated';


// Call the `getAppointmentHistoryRef()` function to get a reference to the query.
const ref = getAppointmentHistoryRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAppointmentHistoryRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appointmentHistory);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory);
});
```

## ListHistoryForAppointment
You can execute the `ListHistoryForAppointment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listHistoryForAppointment(options?: ExecuteQueryOptions): QueryPromise<ListHistoryForAppointmentData, undefined>;

interface ListHistoryForAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListHistoryForAppointmentData, undefined>;
}
export const listHistoryForAppointmentRef: ListHistoryForAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listHistoryForAppointment(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListHistoryForAppointmentData, undefined>;

interface ListHistoryForAppointmentRef {
  ...
  (dc: DataConnect): QueryRef<ListHistoryForAppointmentData, undefined>;
}
export const listHistoryForAppointmentRef: ListHistoryForAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listHistoryForAppointmentRef:
```typescript
const name = listHistoryForAppointmentRef.operationName;
console.log(name);
```

### Variables
The `ListHistoryForAppointment` query has no variables.
### Return Type
Recall that executing the `ListHistoryForAppointment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListHistoryForAppointmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListHistoryForAppointmentData {
  appointmentHistories: ({
    newStatus: string;
    timestamp: TimestampString;
  })[];
}
```
### Using `ListHistoryForAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listHistoryForAppointment } from '@dataconnect/generated';


// Call the `listHistoryForAppointment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listHistoryForAppointment();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listHistoryForAppointment(dataConnect);

console.log(data.appointmentHistories);

// Or, you can use the `Promise` API.
listHistoryForAppointment().then((response) => {
  const data = response.data;
  console.log(data.appointmentHistories);
});
```

### Using `ListHistoryForAppointment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listHistoryForAppointmentRef } from '@dataconnect/generated';


// Call the `listHistoryForAppointmentRef()` function to get a reference to the query.
const ref = listHistoryForAppointmentRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listHistoryForAppointmentRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appointmentHistories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appointmentHistories);
});
```

## GetAvailability
You can execute the `GetAvailability` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAvailability(options?: ExecuteQueryOptions): QueryPromise<GetAvailabilityData, undefined>;

interface GetAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAvailabilityData, undefined>;
}
export const getAvailabilityRef: GetAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAvailability(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAvailabilityData, undefined>;

interface GetAvailabilityRef {
  ...
  (dc: DataConnect): QueryRef<GetAvailabilityData, undefined>;
}
export const getAvailabilityRef: GetAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAvailabilityRef:
```typescript
const name = getAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `GetAvailability` query has no variables.
### Return Type
Recall that executing the `GetAvailability` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAvailabilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAvailabilityData {
  availability?: {
    startTime: string;
    endTime: string;
  };
}
```
### Using `GetAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAvailability } from '@dataconnect/generated';


// Call the `getAvailability()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAvailability();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAvailability(dataConnect);

console.log(data.availability);

// Or, you can use the `Promise` API.
getAvailability().then((response) => {
  const data = response.data;
  console.log(data.availability);
});
```

### Using `GetAvailability`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAvailabilityRef } from '@dataconnect/generated';


// Call the `getAvailabilityRef()` function to get a reference to the query.
const ref = getAvailabilityRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAvailabilityRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.availability);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.availability);
});
```

## ListDoctorAvailability
You can execute the `ListDoctorAvailability` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDoctorAvailability(options?: ExecuteQueryOptions): QueryPromise<ListDoctorAvailabilityData, undefined>;

interface ListDoctorAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDoctorAvailabilityData, undefined>;
}
export const listDoctorAvailabilityRef: ListDoctorAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDoctorAvailability(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDoctorAvailabilityData, undefined>;

interface ListDoctorAvailabilityRef {
  ...
  (dc: DataConnect): QueryRef<ListDoctorAvailabilityData, undefined>;
}
export const listDoctorAvailabilityRef: ListDoctorAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDoctorAvailabilityRef:
```typescript
const name = listDoctorAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `ListDoctorAvailability` query has no variables.
### Return Type
Recall that executing the `ListDoctorAvailability` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDoctorAvailabilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDoctorAvailabilityData {
  availabilities: ({
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  })[];
}
```
### Using `ListDoctorAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDoctorAvailability } from '@dataconnect/generated';


// Call the `listDoctorAvailability()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDoctorAvailability();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDoctorAvailability(dataConnect);

console.log(data.availabilities);

// Or, you can use the `Promise` API.
listDoctorAvailability().then((response) => {
  const data = response.data;
  console.log(data.availabilities);
});
```

### Using `ListDoctorAvailability`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDoctorAvailabilityRef } from '@dataconnect/generated';


// Call the `listDoctorAvailabilityRef()` function to get a reference to the query.
const ref = listDoctorAvailabilityRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDoctorAvailabilityRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.availabilities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.availabilities);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has no variables.
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser } from '@dataconnect/generated';


// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef } from '@dataconnect/generated';


// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateClinic
You can execute the `CreateClinic` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createClinic(): MutationPromise<CreateClinicData, undefined>;

interface CreateClinicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateClinicData, undefined>;
}
export const createClinicRef: CreateClinicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClinic(dc: DataConnect): MutationPromise<CreateClinicData, undefined>;

interface CreateClinicRef {
  ...
  (dc: DataConnect): MutationRef<CreateClinicData, undefined>;
}
export const createClinicRef: CreateClinicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClinicRef:
```typescript
const name = createClinicRef.operationName;
console.log(name);
```

### Variables
The `CreateClinic` mutation has no variables.
### Return Type
Recall that executing the `CreateClinic` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClinicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClinicData {
  clinic_insert: Clinic_Key;
}
```
### Using `CreateClinic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClinic } from '@dataconnect/generated';


// Call the `createClinic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClinic();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClinic(dataConnect);

console.log(data.clinic_insert);

// Or, you can use the `Promise` API.
createClinic().then((response) => {
  const data = response.data;
  console.log(data.clinic_insert);
});
```

### Using `CreateClinic`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClinicRef } from '@dataconnect/generated';


// Call the `createClinicRef()` function to get a reference to the mutation.
const ref = createClinicRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClinicRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clinic_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clinic_insert);
});
```

## UpdateClinic
You can execute the `UpdateClinic` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateClinic(): MutationPromise<UpdateClinicData, undefined>;

interface UpdateClinicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateClinicData, undefined>;
}
export const updateClinicRef: UpdateClinicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateClinic(dc: DataConnect): MutationPromise<UpdateClinicData, undefined>;

interface UpdateClinicRef {
  ...
  (dc: DataConnect): MutationRef<UpdateClinicData, undefined>;
}
export const updateClinicRef: UpdateClinicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateClinicRef:
```typescript
const name = updateClinicRef.operationName;
console.log(name);
```

### Variables
The `UpdateClinic` mutation has no variables.
### Return Type
Recall that executing the `UpdateClinic` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateClinicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateClinicData {
  clinic_update?: Clinic_Key | null;
}
```
### Using `UpdateClinic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateClinic } from '@dataconnect/generated';


// Call the `updateClinic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateClinic();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateClinic(dataConnect);

console.log(data.clinic_update);

// Or, you can use the `Promise` API.
updateClinic().then((response) => {
  const data = response.data;
  console.log(data.clinic_update);
});
```

### Using `UpdateClinic`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateClinicRef } from '@dataconnect/generated';


// Call the `updateClinicRef()` function to get a reference to the mutation.
const ref = updateClinicRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateClinicRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clinic_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clinic_update);
});
```

## DeleteClinic
You can execute the `DeleteClinic` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteClinic(): MutationPromise<DeleteClinicData, undefined>;

interface DeleteClinicRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteClinicData, undefined>;
}
export const deleteClinicRef: DeleteClinicRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteClinic(dc: DataConnect): MutationPromise<DeleteClinicData, undefined>;

interface DeleteClinicRef {
  ...
  (dc: DataConnect): MutationRef<DeleteClinicData, undefined>;
}
export const deleteClinicRef: DeleteClinicRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteClinicRef:
```typescript
const name = deleteClinicRef.operationName;
console.log(name);
```

### Variables
The `DeleteClinic` mutation has no variables.
### Return Type
Recall that executing the `DeleteClinic` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteClinicData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteClinicData {
  clinic_delete?: Clinic_Key | null;
}
```
### Using `DeleteClinic`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteClinic } from '@dataconnect/generated';


// Call the `deleteClinic()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteClinic();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteClinic(dataConnect);

console.log(data.clinic_delete);

// Or, you can use the `Promise` API.
deleteClinic().then((response) => {
  const data = response.data;
  console.log(data.clinic_delete);
});
```

### Using `DeleteClinic`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteClinicRef } from '@dataconnect/generated';


// Call the `deleteClinicRef()` function to get a reference to the mutation.
const ref = deleteClinicRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteClinicRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clinic_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clinic_delete);
});
```

## CreateAppointment
You can execute the `CreateAppointment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAppointment(): MutationPromise<CreateAppointmentData, undefined>;

interface CreateAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAppointmentData, undefined>;
}
export const createAppointmentRef: CreateAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAppointment(dc: DataConnect): MutationPromise<CreateAppointmentData, undefined>;

interface CreateAppointmentRef {
  ...
  (dc: DataConnect): MutationRef<CreateAppointmentData, undefined>;
}
export const createAppointmentRef: CreateAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAppointmentRef:
```typescript
const name = createAppointmentRef.operationName;
console.log(name);
```

### Variables
The `CreateAppointment` mutation has no variables.
### Return Type
Recall that executing the `CreateAppointment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAppointmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAppointmentData {
  appointment_insert: Appointment_Key;
}
```
### Using `CreateAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAppointment } from '@dataconnect/generated';


// Call the `createAppointment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAppointment();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAppointment(dataConnect);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
createAppointment().then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `CreateAppointment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAppointmentRef } from '@dataconnect/generated';


// Call the `createAppointmentRef()` function to get a reference to the mutation.
const ref = createAppointmentRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAppointmentRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## UpdateAppointment
You can execute the `UpdateAppointment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAppointment(): MutationPromise<UpdateAppointmentData, undefined>;

interface UpdateAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAppointmentData, undefined>;
}
export const updateAppointmentRef: UpdateAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAppointment(dc: DataConnect): MutationPromise<UpdateAppointmentData, undefined>;

interface UpdateAppointmentRef {
  ...
  (dc: DataConnect): MutationRef<UpdateAppointmentData, undefined>;
}
export const updateAppointmentRef: UpdateAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAppointmentRef:
```typescript
const name = updateAppointmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAppointment` mutation has no variables.
### Return Type
Recall that executing the `UpdateAppointment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAppointmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAppointmentData {
  appointment_update?: Appointment_Key | null;
}
```
### Using `UpdateAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAppointment } from '@dataconnect/generated';


// Call the `updateAppointment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAppointment();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAppointment(dataConnect);

console.log(data.appointment_update);

// Or, you can use the `Promise` API.
updateAppointment().then((response) => {
  const data = response.data;
  console.log(data.appointment_update);
});
```

### Using `UpdateAppointment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAppointmentRef } from '@dataconnect/generated';


// Call the `updateAppointmentRef()` function to get a reference to the mutation.
const ref = updateAppointmentRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAppointmentRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_update);
});
```

## DeleteAppointment
You can execute the `DeleteAppointment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAppointment(): MutationPromise<DeleteAppointmentData, undefined>;

interface DeleteAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAppointmentData, undefined>;
}
export const deleteAppointmentRef: DeleteAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAppointment(dc: DataConnect): MutationPromise<DeleteAppointmentData, undefined>;

interface DeleteAppointmentRef {
  ...
  (dc: DataConnect): MutationRef<DeleteAppointmentData, undefined>;
}
export const deleteAppointmentRef: DeleteAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAppointmentRef:
```typescript
const name = deleteAppointmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteAppointment` mutation has no variables.
### Return Type
Recall that executing the `DeleteAppointment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAppointmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAppointmentData {
  appointment_delete?: Appointment_Key | null;
}
```
### Using `DeleteAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAppointment } from '@dataconnect/generated';


// Call the `deleteAppointment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAppointment();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAppointment(dataConnect);

console.log(data.appointment_delete);

// Or, you can use the `Promise` API.
deleteAppointment().then((response) => {
  const data = response.data;
  console.log(data.appointment_delete);
});
```

### Using `DeleteAppointment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAppointmentRef } from '@dataconnect/generated';


// Call the `deleteAppointmentRef()` function to get a reference to the mutation.
const ref = deleteAppointmentRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAppointmentRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_delete);
});
```

## CreateAppointmentHistory
You can execute the `CreateAppointmentHistory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAppointmentHistory(): MutationPromise<CreateAppointmentHistoryData, undefined>;

interface CreateAppointmentHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAppointmentHistoryData, undefined>;
}
export const createAppointmentHistoryRef: CreateAppointmentHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAppointmentHistory(dc: DataConnect): MutationPromise<CreateAppointmentHistoryData, undefined>;

interface CreateAppointmentHistoryRef {
  ...
  (dc: DataConnect): MutationRef<CreateAppointmentHistoryData, undefined>;
}
export const createAppointmentHistoryRef: CreateAppointmentHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAppointmentHistoryRef:
```typescript
const name = createAppointmentHistoryRef.operationName;
console.log(name);
```

### Variables
The `CreateAppointmentHistory` mutation has no variables.
### Return Type
Recall that executing the `CreateAppointmentHistory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAppointmentHistoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAppointmentHistoryData {
  appointmentHistory_insert: AppointmentHistory_Key;
}
```
### Using `CreateAppointmentHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAppointmentHistory } from '@dataconnect/generated';


// Call the `createAppointmentHistory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAppointmentHistory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAppointmentHistory(dataConnect);

console.log(data.appointmentHistory_insert);

// Or, you can use the `Promise` API.
createAppointmentHistory().then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory_insert);
});
```

### Using `CreateAppointmentHistory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAppointmentHistoryRef } from '@dataconnect/generated';


// Call the `createAppointmentHistoryRef()` function to get a reference to the mutation.
const ref = createAppointmentHistoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAppointmentHistoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointmentHistory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory_insert);
});
```

## UpdateAppointmentHistory
You can execute the `UpdateAppointmentHistory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAppointmentHistory(): MutationPromise<UpdateAppointmentHistoryData, undefined>;

interface UpdateAppointmentHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAppointmentHistoryData, undefined>;
}
export const updateAppointmentHistoryRef: UpdateAppointmentHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAppointmentHistory(dc: DataConnect): MutationPromise<UpdateAppointmentHistoryData, undefined>;

interface UpdateAppointmentHistoryRef {
  ...
  (dc: DataConnect): MutationRef<UpdateAppointmentHistoryData, undefined>;
}
export const updateAppointmentHistoryRef: UpdateAppointmentHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAppointmentHistoryRef:
```typescript
const name = updateAppointmentHistoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateAppointmentHistory` mutation has no variables.
### Return Type
Recall that executing the `UpdateAppointmentHistory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAppointmentHistoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAppointmentHistoryData {
  appointmentHistory_update?: AppointmentHistory_Key | null;
}
```
### Using `UpdateAppointmentHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAppointmentHistory } from '@dataconnect/generated';


// Call the `updateAppointmentHistory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAppointmentHistory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAppointmentHistory(dataConnect);

console.log(data.appointmentHistory_update);

// Or, you can use the `Promise` API.
updateAppointmentHistory().then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory_update);
});
```

### Using `UpdateAppointmentHistory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAppointmentHistoryRef } from '@dataconnect/generated';


// Call the `updateAppointmentHistoryRef()` function to get a reference to the mutation.
const ref = updateAppointmentHistoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAppointmentHistoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointmentHistory_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory_update);
});
```

## DeleteAppointmentHistory
You can execute the `DeleteAppointmentHistory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAppointmentHistory(): MutationPromise<DeleteAppointmentHistoryData, undefined>;

interface DeleteAppointmentHistoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAppointmentHistoryData, undefined>;
}
export const deleteAppointmentHistoryRef: DeleteAppointmentHistoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAppointmentHistory(dc: DataConnect): MutationPromise<DeleteAppointmentHistoryData, undefined>;

interface DeleteAppointmentHistoryRef {
  ...
  (dc: DataConnect): MutationRef<DeleteAppointmentHistoryData, undefined>;
}
export const deleteAppointmentHistoryRef: DeleteAppointmentHistoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAppointmentHistoryRef:
```typescript
const name = deleteAppointmentHistoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteAppointmentHistory` mutation has no variables.
### Return Type
Recall that executing the `DeleteAppointmentHistory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAppointmentHistoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAppointmentHistoryData {
  appointmentHistory_delete?: AppointmentHistory_Key | null;
}
```
### Using `DeleteAppointmentHistory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAppointmentHistory } from '@dataconnect/generated';


// Call the `deleteAppointmentHistory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAppointmentHistory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAppointmentHistory(dataConnect);

console.log(data.appointmentHistory_delete);

// Or, you can use the `Promise` API.
deleteAppointmentHistory().then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory_delete);
});
```

### Using `DeleteAppointmentHistory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAppointmentHistoryRef } from '@dataconnect/generated';


// Call the `deleteAppointmentHistoryRef()` function to get a reference to the mutation.
const ref = deleteAppointmentHistoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAppointmentHistoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointmentHistory_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointmentHistory_delete);
});
```

## CreateAvailability
You can execute the `CreateAvailability` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAvailability(): MutationPromise<CreateAvailabilityData, undefined>;

interface CreateAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateAvailabilityData, undefined>;
}
export const createAvailabilityRef: CreateAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAvailability(dc: DataConnect): MutationPromise<CreateAvailabilityData, undefined>;

interface CreateAvailabilityRef {
  ...
  (dc: DataConnect): MutationRef<CreateAvailabilityData, undefined>;
}
export const createAvailabilityRef: CreateAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAvailabilityRef:
```typescript
const name = createAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `CreateAvailability` mutation has no variables.
### Return Type
Recall that executing the `CreateAvailability` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAvailabilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAvailabilityData {
  availability_insert: Availability_Key;
}
```
### Using `CreateAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAvailability } from '@dataconnect/generated';


// Call the `createAvailability()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAvailability();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAvailability(dataConnect);

console.log(data.availability_insert);

// Or, you can use the `Promise` API.
createAvailability().then((response) => {
  const data = response.data;
  console.log(data.availability_insert);
});
```

### Using `CreateAvailability`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAvailabilityRef } from '@dataconnect/generated';


// Call the `createAvailabilityRef()` function to get a reference to the mutation.
const ref = createAvailabilityRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAvailabilityRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.availability_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.availability_insert);
});
```

## UpdateAvailability
You can execute the `UpdateAvailability` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAvailability(): MutationPromise<UpdateAvailabilityData, undefined>;

interface UpdateAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateAvailabilityData, undefined>;
}
export const updateAvailabilityRef: UpdateAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAvailability(dc: DataConnect): MutationPromise<UpdateAvailabilityData, undefined>;

interface UpdateAvailabilityRef {
  ...
  (dc: DataConnect): MutationRef<UpdateAvailabilityData, undefined>;
}
export const updateAvailabilityRef: UpdateAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAvailabilityRef:
```typescript
const name = updateAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `UpdateAvailability` mutation has no variables.
### Return Type
Recall that executing the `UpdateAvailability` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAvailabilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAvailabilityData {
  availability_update?: Availability_Key | null;
}
```
### Using `UpdateAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAvailability } from '@dataconnect/generated';


// Call the `updateAvailability()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAvailability();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAvailability(dataConnect);

console.log(data.availability_update);

// Or, you can use the `Promise` API.
updateAvailability().then((response) => {
  const data = response.data;
  console.log(data.availability_update);
});
```

### Using `UpdateAvailability`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAvailabilityRef } from '@dataconnect/generated';


// Call the `updateAvailabilityRef()` function to get a reference to the mutation.
const ref = updateAvailabilityRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAvailabilityRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.availability_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.availability_update);
});
```

## DeleteAvailability
You can execute the `DeleteAvailability` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAvailability(): MutationPromise<DeleteAvailabilityData, undefined>;

interface DeleteAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteAvailabilityData, undefined>;
}
export const deleteAvailabilityRef: DeleteAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAvailability(dc: DataConnect): MutationPromise<DeleteAvailabilityData, undefined>;

interface DeleteAvailabilityRef {
  ...
  (dc: DataConnect): MutationRef<DeleteAvailabilityData, undefined>;
}
export const deleteAvailabilityRef: DeleteAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAvailabilityRef:
```typescript
const name = deleteAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `DeleteAvailability` mutation has no variables.
### Return Type
Recall that executing the `DeleteAvailability` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAvailabilityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAvailabilityData {
  availability_delete?: Availability_Key | null;
}
```
### Using `DeleteAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAvailability } from '@dataconnect/generated';


// Call the `deleteAvailability()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAvailability();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAvailability(dataConnect);

console.log(data.availability_delete);

// Or, you can use the `Promise` API.
deleteAvailability().then((response) => {
  const data = response.data;
  console.log(data.availability_delete);
});
```

### Using `DeleteAvailability`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAvailabilityRef } from '@dataconnect/generated';


// Call the `deleteAvailabilityRef()` function to get a reference to the mutation.
const ref = deleteAvailabilityRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAvailabilityRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.availability_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.availability_delete);
});
```

