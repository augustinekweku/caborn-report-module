export const USER_TYPES = {
  PARENT: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
  BLOCK: 4,
  STAFF: 5,
};

export const NAV_LINKS = [
  //FOR SUPER ADMIN AND ADMIN
  {
    label: "Dashboard",
    path: "/dashboard",
    img_url: "/images/svg/teachers-icon.svg",
    isActive: true,
    allowableUserTypes: [USER_TYPES.PARENT],
  },
  {
    label: "Profile ",
    path: "/profile",
    img_url: "/images/svg/students-icon.svg",
    isActive: true,
    allowableUserTypes: [USER_TYPES.PARENT],
  },
  {
    label: "Results ",
    path: "/results",
    img_url: "/images/svg/students-icon.svg",
    isActive: true,
    allowableUserTypes: [USER_TYPES.PARENT],
  },
];

export const COOKIE_KEY = "smsStudentToken";
export const USER_TYPE_KEY = "smsStudentPortalUserType";
export const DATE_TIME_FORMAT = "ddd Do MMMM YYYY h:mm";

export enum GENDER_OPTIONS {
  MALE = "male",
  FEMALE = "female",
}

export const GRADE_REMARKS = [
  { label: "Excellent", value: "Excellent" },
  { label: "Very Good", value: "Very Good" },
  { label: "Good", value: "Good" },
  { label: "Fair", value: "Fair" },
  { label: "Average", value: "Average" },
  { label: "Satisfactory", value: "Satisfactory" },
  { label: "Pass", value: "Pass" },
  { label: "Unsatisfactory", value: "Unsatisfactory" },
  { label: "Below Average", value: "Below Average" },

  { label: "Poor", value: "Poor" },
  { label: "Very Poor", value: "Very Poor" },
  { label: "Fail", value: "Fail" },
];

export const GRADE_VALUES = [
  { label: "A", value: "A" },
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "A1", value: "A1" },

  { label: "B", value: "B" },
  { label: "B2", value: "B2" },
  { label: "B3", value: "B3" },

  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "C", value: "C" },
  { label: "C4", value: "C4" },
  { label: "C+", value: "C+" },

  { label: "C-", value: "C-" },
  { label: "D", value: "D" },
  { label: "D7", value: "D7" },
  { label: "D+", value: "D+" },
  { label: "D-", value: "D-" },
  { label: "E", value: "E" },
  { label: "E8", value: "E8" },
  { label: "F", value: "F" },
  { label: "F9", value: "F9" },
];

export const USER_TYPE_OPTIONS = [
  { label: "Parent", value: USER_TYPES.PARENT },
  { label: "Admin", value: USER_TYPES.ADMIN },
  { label: "Super Admin", value: USER_TYPES.SUPER_ADMIN },
  { label: "Block", value: USER_TYPES.BLOCK },
  { label: "Staff", value: USER_TYPES.STAFF },
];
