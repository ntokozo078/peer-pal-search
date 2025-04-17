
import { TutorProfile, SearchQuery } from "@/types";
import { tutors, subjects } from "./mock-data";

// Common days and their variations
const dayMap: Record<string, string[]> = {
  monday: ["monday", "mon", "mondays"],
  tuesday: ["tuesday", "tue", "tues", "tuesdays"],
  wednesday: ["wednesday", "wed", "wednesdays"],
  thursday: ["thursday", "thu", "thur", "thurs", "thursdays"],
  friday: ["friday", "fri", "fridays"],
  saturday: ["saturday", "sat", "saturdays"],
  sunday: ["sunday", "sun", "sundays"],
  weekend: ["weekend", "weekends", "saturday", "sunday", "sat", "sun"],
  weekday: ["weekday", "weekdays", "monday", "tuesday", "wednesday", "thursday", "friday"],
};

// Time periods mapping
const timeMap: Record<string, { start: string; end: string }> = {
  morning: { start: "06:00", end: "12:00" },
  afternoon: { start: "12:00", end: "17:00" },
  evening: { start: "17:00", end: "21:00" },
  night: { start: "21:00", end: "23:59" },
};

// Level mapping
const levelMap: Record<string, string> = {
  beginner: "Beginner",
  basic: "Beginner",
  introductory: "Beginner",
  intermediate: "Intermediate",
  medium: "Intermediate",
  advanced: "Advanced",
  expert: "Advanced",
  "first-year": "Beginner",
  "second-year": "Intermediate",
  "third-year": "Advanced",
  "fourth-year": "Advanced",
};

// Mode mapping
const modeMap: Record<string, "online" | "in-person"> = {
  online: "online",
  virtual: "online",
  zoom: "online",
  remote: "online",
  "in-person": "in-person",
  "face-to-face": "in-person",
  campus: "in-person",
  physical: "in-person",
};

export function parseNaturalLanguageQuery(query: string): SearchQuery {
  const normalizedQuery = query.toLowerCase();
  const result: SearchQuery = {
    text: query,
  };

  // Extract subject
  for (const subject of subjects) {
    if (normalizedQuery.includes(subject.name.toLowerCase())) {
      result.subject = subject.name;
      break;
    }
  }

  // Extract day and time
  result.availability = {};
  
  // Check for days
  for (const [day, variants] of Object.entries(dayMap)) {
    if (variants.some(variant => normalizedQuery.includes(variant))) {
      result.availability.day = day;
      break;
    }
  }

  // Check for time periods
  for (const [period, timeRange] of Object.entries(timeMap)) {
    if (normalizedQuery.includes(period)) {
      result.availability.time = period;
      break;
    }
  }

  // Extract level
  for (const [levelKey, levelValue] of Object.entries(levelMap)) {
    if (normalizedQuery.includes(levelKey)) {
      result.level = levelValue;
      break;
    }
  }

  // Extract mode
  for (const [modeKey, modeValue] of Object.entries(modeMap)) {
    if (normalizedQuery.includes(modeKey)) {
      result.mode = modeValue;
      break;
    }
  }

  return result;
}

export function searchTutors(query: SearchQuery): TutorProfile[] {
  let filteredTutors = [...tutors];

  // Filter by subject
  if (query.subject) {
    filteredTutors = filteredTutors.filter(tutor => 
      tutor.subjects.some(subject => 
        subject.name.toLowerCase().includes(query.subject!.toLowerCase())
      )
    );
  }

  // Filter by level
  if (query.level) {
    filteredTutors = filteredTutors.filter(tutor =>
      tutor.subjects.some(subject => subject.level === query.level)
    );
  }

  // Filter by availability day
  if (query.availability?.day) {
    const dayVariants = dayMap[query.availability.day] || [query.availability.day];
    
    filteredTutors = filteredTutors.filter(tutor =>
      tutor.availability.some(avail => 
        dayVariants.some(dayVariant => avail.day.toLowerCase() === dayVariant)
      )
    );
  }

  // Filter by mode (online/in-person)
  // This would typically filter by a property on the tutor profile
  // For the mock data, we're not implementing this filter as tutors don't have a mode property

  // If no specific filters matched but there's text, use it for a general search
  if (query.text && !query.subject && !query.level && !query.availability?.day) {
    const searchTerms = query.text.toLowerCase().split(' ');
    
    filteredTutors = filteredTutors.filter(tutor => {
      const tutorText = `${tutor.name.toLowerCase()} ${tutor.bio?.toLowerCase() || ''} ${tutor.subjects.map(s => s.name.toLowerCase()).join(' ')}`;
      return searchTerms.some(term => tutorText.includes(term));
    });
  }

  return filteredTutors;
}
