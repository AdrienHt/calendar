import {ValidResource, ValidResourceInstance} from "@devexpress/dx-react-scheduler";

export interface StaffMember {
    id: number;
    first_name: string;
    last_name: string;
}

export function getStaffMembersName(staffMember: StaffMember) {
    return staffMember['first_name'] + ' ' + staffMember['last_name'];
}

export function formatStaffMembersToResource(staffMembers: StaffMember[]): ValidResource {
    return {
        allowMultiple: false,
        isMain: false,
        fieldName: 'staff_member_id',
        title: 'Staff members',
        instances: formatToValidResourceInstance(staffMembers)
    };
}

export function formatToValidResourceInstance(staffMember: StaffMember[]): Array<ValidResourceInstance> {
    return staffMember.map((staffMember: StaffMember) => ({
        title: 'Staff members',
        fieldName: 'staff_member_id',
        isMain: false,
        allowMultiple: false,
        color: '',
        id: staffMember.id,
        text: getStaffMembersName(staffMember),
    }));
}