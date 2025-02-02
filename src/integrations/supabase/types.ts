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
      availability: {
        Row: {
          available_times: string[]
          created_at: string
          date: string
          id: string
          is_open: boolean
        }
        Insert: {
          available_times: string[]
          created_at?: string
          date: string
          id?: string
          is_open?: boolean
        }
        Update: {
          available_times?: string[]
          created_at?: string
          date?: string
          id?: string
          is_open?: boolean
        }
        Relationships: []
      }
      bookings: {
        Row: {
          attendee: string | null
          created_at: string
          duration: number | null
          end_date: string | null
          google_calendar_event_id: string | null
          id: string
          start_date: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          user_id: string | null
        }
        Insert: {
          attendee?: string | null
          created_at?: string
          duration?: number | null
          end_date?: string | null
          google_calendar_event_id?: string | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          user_id?: string | null
        }
        Update: {
          attendee?: string | null
          created_at?: string
          duration?: number | null
          end_date?: string | null
          google_calendar_event_id?: string | null
          id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "paid_users"
            referencedColumns: ["id"]
          },
        ]
      }
      email_interactions: {
        Row: {
          created_at: string
          email: string
          email_id: string
          email_subject: string
          email_type: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          email_id: string
          email_subject: string
          email_type: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          email_id?: string
          email_subject?: string
          email_type?: string
          id?: string
        }
        Relationships: []
      }
      email_sequences: {
        Row: {
          created_at: string
          current_step: number
          email: string
          email_id: string | null
          id: string
          next_step: number
        }
        Insert: {
          created_at?: string
          current_step: number
          email: string
          email_id?: string | null
          id?: string
          next_step: number
        }
        Update: {
          created_at?: string
          current_step?: number
          email?: string
          email_id?: string | null
          id?: string
          next_step?: number
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          template_key: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          template_key: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          template_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      paid_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_paid: boolean
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_paid?: boolean
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_paid?: boolean
          name?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          email: string
          email_sent: boolean | null
          id: string
          status: string
          transaction_hash: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          email: string
          email_sent?: boolean | null
          id?: string
          status?: string
          transaction_hash?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string
          email_sent?: boolean | null
          id?: string
          status?: string
          transaction_hash?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          i18n: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          i18n?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          i18n?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      template_translations: {
        Row: {
          body: string
          created_at: string | null
          id: string
          language: string
          subject: string
          template_id: string
          updated_at: string | null
          variables_hint: Json | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          language: string
          subject: string
          template_id: string
          updated_at?: string | null
          variables_hint?: Json | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          language?: string
          subject?: string
          template_id?: string
          updated_at?: string | null
          variables_hint?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_template_id"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
          updated_at?: string
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
      booking_status: "confirmed" | "pending" | "cancelled"
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
