import "dart:convert";
import "package:http/http.dart" as http;

class ApiService {
  const ApiService();

  static const String baseUrl = "http://localhost:5000/api";

  Future<Map<String, dynamic>> getFarmerDashboard(String token) async {
    final response = await http.get(
      Uri.parse("$baseUrl/dashboard/farmer"),
      headers: {"Authorization": "Bearer $token"},
    );

    return jsonDecode(response.body) as Map<String, dynamic>;
  }
}
