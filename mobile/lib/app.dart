import "package:flutter/material.dart";
import "features/alerts/alerts_page.dart";
import "features/dashboard/dashboard_page.dart";
import "features/profile/profile_page.dart";

class AIVillageBrainApp extends StatelessWidget {
  const AIVillageBrainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "AI Village Brain",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF349E61)),
        scaffoldBackgroundColor: const Color(0xFFF2FAF4),
      ),
      home: const MobileShell(),
    );
  }
}

class MobileShell extends StatefulWidget {
  const MobileShell({super.key});

  @override
  State<MobileShell> createState() => _MobileShellState();
}

class _MobileShellState extends State<MobileShell> {
  int index = 0;

  final pages = const [
    DashboardPage(),
    AlertsPage(),
    ProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[index],
      bottomNavigationBar: NavigationBar(
        selectedIndex: index,
        onDestinationSelected: (value) => setState(() => index = value),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.dashboard_outlined), label: "Dashboard"),
          NavigationDestination(icon: Icon(Icons.notifications_outlined), label: "Alerts"),
          NavigationDestination(icon: Icon(Icons.person_outline), label: "Profile"),
        ],
      ),
    );
  }
}
