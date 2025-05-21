import prisma from "./prisma";
import { Role } from "@prisma/client";

// Interface for role mapping
interface RoleMapping {
  dashboardPath: string;
  displayName: string;
}

// Function to get dashboard path based on role
export async function getDashboardPathForRole(role: Role): Promise<string> {
  // Default mappings (fallback)
  const defaultMappings: Record<Role, RoleMapping> = {
    ADMIN: {
      dashboardPath: "/dashboard/admin",
      displayName: "Admin Dashboard"
    },
    USER: {
      dashboardPath: "/dashboard/user",
      displayName: "User Dashboard"
    }
  };
  
  try {
    // In a real implementation, you would fetch this from the database
    // For example, from a RoleMappings table
    // const roleMappings = await prisma.roleMappings.findUnique({
    //   where: { role }
    // });
    
    // For now, return the default mapping
    return defaultMappings[role].dashboardPath;
  } catch (error) {
    console.error("Error fetching role mapping:", error);
    // Fallback to default mapping if database query fails
    return defaultMappings[role]?.dashboardPath || "/dashboard/user";
  }
}

// Function to get display name for a role
export async function getDisplayNameForRole(role: Role): Promise<string> {
  // Default mappings (fallback)
  const defaultMappings: Record<Role, RoleMapping> = {
    ADMIN: {
      dashboardPath: "/dashboard/admin",
      displayName: "Admin Dashboard"
    },
    USER: {
      dashboardPath: "/dashboard/user",
      displayName: "User Dashboard"
    }
  };
  
  try {
    // In a real implementation, you would fetch this from the database
    // For now, return the default mapping
    return defaultMappings[role].displayName;
  } catch (error) {
    console.error("Error fetching role display name:", error);
    // Fallback to default mapping if database query fails
    return defaultMappings[role]?.displayName || "User Dashboard";
  }
}
