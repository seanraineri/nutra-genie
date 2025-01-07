export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_history: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          message: string
          role: string
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          message: string
          role: string
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          message?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      health_files: {
        Row: {
          file_path: string
          file_type: string | null
          filename: string
          id: string
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          file_path: string
          file_type?: string | null
          filename: string
          id?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          file_path?: string
          file_type?: string | null
          filename?: string
          id?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      health_goals: {
        Row: {
          created_at: string | null
          description: string | null
          goal_name: string
          id: string
          progress: number | null
          target: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          goal_name: string
          id?: string
          progress?: number | null
          target?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          goal_name?: string
          id?: string
          progress?: number | null
          target?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      lab_results: {
        Row: {
          created_at: string | null
          id: string
          reference_range_max: number | null
          reference_range_min: number | null
          test_date: string | null
          test_name: string | null
          unit: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reference_range_max?: number | null
          reference_range_min?: number | null
          test_date?: string | null
          test_name?: string | null
          unit?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reference_range_max?: number | null
          reference_range_min?: number | null
          test_date?: string | null
          test_name?: string | null
          unit?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: []
      }
      pending_health_profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          allergies: string[] | null
          created_at: string | null
          current_medications: string[] | null
          email: string
          expires_at: string | null
          first_name: string | null
          gender: string | null
          health_goals: string | null
          height: number | null
          id: string
          last_name: string | null
          medical_conditions: string[] | null
          password: string
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          current_medications?: string[] | null
          email: string
          expires_at?: string | null
          first_name?: string | null
          gender?: string | null
          health_goals?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          medical_conditions?: string[] | null
          password: string
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          current_medications?: string[] | null
          email?: string
          expires_at?: string | null
          first_name?: string | null
          gender?: string | null
          health_goals?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          medical_conditions?: string[] | null
          password?: string
          weight?: number | null
        }
        Relationships: []
      }
      supplement_recommendations: {
        Row: {
          company_name: string | null
          created_at: string | null
          dosage: string | null
          estimated_cost: number | null
          id: string
          image_url: string | null
          priority: number | null
          product_url: string | null
          reason: string | null
          supplement_name: string | null
          user_id: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          dosage?: string | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          priority?: number | null
          product_url?: string | null
          reason?: string | null
          supplement_name?: string | null
          user_id?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          dosage?: string | null
          estimated_cost?: number | null
          id?: string
          image_url?: string | null
          priority?: number | null
          product_url?: string | null
          reason?: string | null
          supplement_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_health_profiles: {
        Row: {
          age: number | null
          allergies: string[] | null
          created_at: string | null
          current_medications: string[] | null
          gender: string | null
          height: number | null
          id: string
          medical_conditions: string[] | null
          monthly_supplement_budget: number | null
          updated_at: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          current_medications?: string[] | null
          gender?: string | null
          height?: number | null
          id?: string
          medical_conditions?: string[] | null
          monthly_supplement_budget?: number | null
          updated_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          allergies?: string[] | null
          created_at?: string | null
          current_medications?: string[] | null
          gender?: string | null
          height?: number | null
          id?: string
          medical_conditions?: string[] | null
          monthly_supplement_budget?: number | null
          updated_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
