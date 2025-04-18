import ExpoModulesCore
import WidgetKit

public class SmartSettingsModule: Module {
    public func definition() -> ModuleDefinition {
        // Name of the module as used in JS
        Name("SmartSettings")

        // Function to call from JS
        Function("setLectures") { (key: String, lectures: [[String: Any]], group: String?) in            
            let userDefaults = UserDefaults(suiteName: group)

            do {
                let jsonData = try JSONSerialization.data(withJSONObject: lectures, options: [])
                userDefaults?.set(jsonData, forKey: key)
                
                if #available(iOS 14.0, *) {
                    WidgetCenter.shared.reloadAllTimelines()
                }
            } catch {
                print("Failed to save organized lectures: \(error)")
            }
            
        }

        Function("setLectureName") { (key: String, lectureName: String, group: String?) in            
            let userDefaults = UserDefaults(
              // The group name is the same as the App Group name
              suiteName: group
            )
            do {
                print("Saving lectures to shared storage")
                // let jsonData = try JSONSerialization.data(withJSONObject: lectures, options: [])
                userDefaults?.set(lectureName, forKey: key)
                print("Saved lecture name to shared storage")

                // Trigger a widget update to sync the data
                if #available(iOS 14.0, *) {
                    WidgetCenter.shared.reloadAllTimelines()
                }
            } catch {
                print("Failed to save lecture name: \(error)")
            }
        
        }
    }
}