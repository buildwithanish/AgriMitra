import "package:flutter/material.dart";

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(20),
        children: const [
          _HeroCard(),
          SizedBox(height: 16),
          _InsightTile(title: "Crop recommendation", value: "Wheat + Chickpea"),
          _InsightTile(title: "Weather", value: "28\u00B0C, light wind"),
          _InsightTile(title: "Market signal", value: "Tomato trend up 6.2%"),
          _InsightTile(title: "Alerts", value: "Leaf rust watch in block B"),
        ],
      ),
    );
  }
}

class _HeroCard extends StatelessWidget {
  const _HeroCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        gradient: const LinearGradient(
          colors: [Color(0xFF1F633D), Color(0xFF349E61)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "AI Village Brain",
            style: TextStyle(color: Colors.white70, letterSpacing: 1.4, fontSize: 12),
          ),
          SizedBox(height: 12),
          Text(
            "Farmer mobile command center",
            style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 10),
          Text(
            "Clean Flutter structure ready for API integration with the web platform.",
            style: TextStyle(color: Colors.white70, height: 1.4),
          )
        ],
      ),
    );
  }
}

class _InsightTile extends StatelessWidget {
  final String title;
  final String value;

  const _InsightTile({required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(value),
      ),
    );
  }
}
