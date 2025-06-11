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
      beta_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      learning_sessions: {
        Row: {
          created_at: string
          id: string
          minutes_studied: number
          scenarios_completed: number
          session_date: string
          updated_at: string
          user_id: string
          vocabulary_practiced: number
        }
        Insert: {
          created_at?: string
          id?: string
          minutes_studied?: number
          scenarios_completed?: number
          session_date?: string
          updated_at?: string
          user_id: string
          vocabulary_practiced?: number
        }
        Update: {
          created_at?: string
          id?: string
          minutes_studied?: number
          scenarios_completed?: number
          session_date?: string
          updated_at?: string
          user_id?: string
          vocabulary_practiced?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          daily_goal_minutes: number | null
          experience_level: string | null
          german_level: string | null
          id: string
          learning_preferences: Json | null
          name: string | null
          native_language: string | null
          practice_needs: string[] | null
          preferences: Json | null
          profession: string | null
          profession_category: string | null
          specialty_areas: string[] | null
          updated_at: string
          weekly_goal_sessions: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          daily_goal_minutes?: number | null
          experience_level?: string | null
          german_level?: string | null
          id: string
          learning_preferences?: Json | null
          name?: string | null
          native_language?: string | null
          practice_needs?: string[] | null
          preferences?: Json | null
          profession?: string | null
          profession_category?: string | null
          specialty_areas?: string[] | null
          updated_at?: string
          weekly_goal_sessions?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          daily_goal_minutes?: number | null
          experience_level?: string | null
          german_level?: string | null
          id?: string
          learning_preferences?: Json | null
          name?: string | null
          native_language?: string | null
          practice_needs?: string[] | null
          preferences?: Json | null
          profession?: string | null
          profession_category?: string | null
          specialty_areas?: string[] | null
          updated_at?: string
          weekly_goal_sessions?: number | null
        }
        Relationships: []
      }
      scenario_attempts: {
        Row: {
          accuracy_score: number | null
          completed_at: string
          created_at: string
          duration_minutes: number | null
          feedback_quality: string | null
          id: string
          notes: string | null
          scenario_id: string
          scenario_type: string
          user_id: string
        }
        Insert: {
          accuracy_score?: number | null
          completed_at?: string
          created_at?: string
          duration_minutes?: number | null
          feedback_quality?: string | null
          id?: string
          notes?: string | null
          scenario_id: string
          scenario_type: string
          user_id: string
        }
        Update: {
          accuracy_score?: number | null
          completed_at?: string
          created_at?: string
          duration_minutes?: number | null
          feedback_quality?: string | null
          id?: string
          notes?: string | null
          scenario_id?: string
          scenario_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          created_at: string
          current_streak: number
          daily_goal_minutes: number
          id: string
          last_study_date: string | null
          longest_streak: number
          scenarios_completed: number
          total_study_minutes: number
          updated_at: string
          user_id: string
          vocabulary_mastered: number
          weekly_goal_minutes: number
        }
        Insert: {
          created_at?: string
          current_streak?: number
          daily_goal_minutes?: number
          id?: string
          last_study_date?: string | null
          longest_streak?: number
          scenarios_completed?: number
          total_study_minutes?: number
          updated_at?: string
          user_id: string
          vocabulary_mastered?: number
          weekly_goal_minutes?: number
        }
        Update: {
          created_at?: string
          current_streak?: number
          daily_goal_minutes?: number
          id?: string
          last_study_date?: string | null
          longest_streak?: number
          scenarios_completed?: number
          total_study_minutes?: number
          updated_at?: string
          user_id?: string
          vocabulary_mastered?: number
          weekly_goal_minutes?: number
        }
        Relationships: []
      }
      vocabulary_mastery: {
        Row: {
          category: string
          correct_attempts: number
          created_at: string
          id: string
          last_practiced: string
          mastery_level: number
          total_attempts: number
          updated_at: string
          user_id: string
          word_id: string
        }
        Insert: {
          category: string
          correct_attempts?: number
          created_at?: string
          id?: string
          last_practiced?: string
          mastery_level?: number
          total_attempts?: number
          updated_at?: string
          user_id: string
          word_id: string
        }
        Update: {
          category?: string
          correct_attempts?: number
          created_at?: string
          id?: string
          last_practiced?: string
          mastery_level?: number
          total_attempts?: number
          updated_at?: string
          user_id?: string
          word_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
